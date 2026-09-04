const agent = require('../services/ai/agent');
const AIProviderError = require('../services/ai/AIProviderError');

function scriptedProvider(responses) {
  let call = 0;
  return {
    generate: jest.fn(async () => {
      const response = responses[Math.min(call, responses.length - 1)];
      call += 1;
      return response;
    }),
  };
}

describe('AI agent — tool-calling loop', () => {
  it('returns the model\'s text directly when it makes no tool call', async () => {
    const provider = scriptedProvider([{ text: 'Hello there!', functionCalls: [] }]);

    const result = await agent.chat({ message: 'hi', provider });

    expect(result.message).toBe('Hello there!');
    expect(result.results).toEqual([]);
  });

  it('executes a real tool call and feeds its real (non-fabricated) result back to the model', async () => {
    const provider = scriptedProvider([
      { text: null, functionCalls: [{ name: 'checkTeacherExists', args: { name: 'Nobody' } }] },
      { text: 'No such teacher was found.', functionCalls: [] },
    ]);

    const result = await agent.chat({ message: 'Is Nobody a teacher?', provider });

    expect(provider.generate).toHaveBeenCalledTimes(2);
    const secondCallContents = provider.generate.mock.calls[1][0].contents;
    const functionResponsePart = secondCallContents.at(-1).parts[0];
    expect(functionResponsePart.functionResponse.response).toEqual({ exists: false });
    expect(result.message).toBe('No such teacher was found.');
  });

  it('surfaces a tool\'s publicResults so the frontend can render structured cards', async () => {
    const User = require('../models/User');
    const Teacher = require('../models/Teacher');
    const { validTeacherPayload } = require('./helpers');
    const user = await User.create({ username: 'carddemo', email: 'carddemo@example.com', password: 'password123' });
    await Teacher.create({ ...validTeacherPayload({ name: 'Card Demo Teacher' }), userId: user._id, isVisible: true });

    const provider = scriptedProvider([
      { text: null, functionCalls: [{ name: 'checkTeacherExists', args: { name: 'Card Demo' } }] },
      { text: 'Yes, Card Demo Teacher is registered.', functionCalls: [] },
    ]);

    const result = await agent.chat({ message: 'Is Card Demo Teacher here?', provider });

    expect(result.results).toHaveLength(1);
    expect(result.results[0].name).toBe('Card Demo Teacher');
  });

  it('stops after the iteration cap instead of looping forever', async () => {
    const provider = {
      generate: jest.fn(async () => ({ text: null, functionCalls: [{ name: 'getSubjects', args: {} }] })),
    };

    const result = await agent.chat({ message: 'loop forever', provider });

    expect(provider.generate.mock.calls.length).toBeLessThanOrEqual(4);
    expect(result.message).toMatch(/narrow it down/i);
  });

  it('returns a friendly message instead of throwing when the provider errors', async () => {
    const provider = {
      generate: jest.fn(async () => {
        throw new AIProviderError('boom', AIProviderError.CATEGORIES.RATE_LIMIT);
      }),
    };

    const result = await agent.chat({ message: 'hi', provider });

    expect(result.message).toMatch(/try again/i);
  });

  it('returns the "not configured" fallback when no provider is available', async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const result = await agent.chat({ message: 'hi' });

    expect(result.message).toMatch(/isn't configured/i);
    expect(result.results).toEqual([]);

    if (originalKey) process.env.GEMINI_API_KEY = originalKey;
  });
});
