const request = require('supertest');
const app = require('../app');
const { registerUser } = require('./helpers');

describe('POST /api/ai/chat', () => {
  it('rejects an empty message', async () => {
    const res = await request(app).post('/api/ai/chat').send({ message: '' });
    expect(res.status).toBe(400);
  });

  it('rejects a message over the length limit', async () => {
    const res = await request(app).post('/api/ai/chat').send({ message: 'x'.repeat(2001) });
    expect(res.status).toBe(400);
  });

  it('lets a guest chat and responds gracefully when Gemini is not configured', async () => {
    const originalKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    try {
      const res = await request(app).post('/api/ai/chat').send({ message: 'Hello' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/isn't configured/i);
      expect(res.body.results).toEqual([]);
    } finally {
      if (originalKey) {
        process.env.GEMINI_API_KEY = originalKey;
      }
    }
  });

  it('accepts an authenticated request the same way — optionalAuth does not block a valid token', async () => {
    const { token } = await registerUser(app);

    const res = await request(app)
      .post('/api/ai/chat')
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'Hello' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('treats an invalid token as a guest instead of rejecting the request', async () => {
    const res = await request(app)
      .post('/api/ai/chat')
      .set('Authorization', 'Bearer not-a-real-token')
      .send({ message: 'Hello' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
