const User = require('../models/User');
const Teacher = require('../models/Teacher');
const toolRegistry = require('../services/ai/tools');
const { validTeacherPayload } = require('./helpers');

let counter = 0;
async function createTeacher(overrides = {}) {
  counter += 1;
  const user = await User.create({
    username: `tool-user-${counter}`,
    email: `tool-user-${counter}@example.com`,
    password: 'password123',
  });
  const teacher = await Teacher.create({ ...validTeacherPayload(overrides), userId: user._id });
  return { user, teacher };
}

describe('AI tool registry — real database, no mocking', () => {
  it('checkTeacherExists finds a real teacher by a partial, case-insensitive name', async () => {
    await createTeacher({ name: 'Aayush Singh Rajput' });

    const result = await toolRegistry.execute('checkTeacherExists', { name: 'aayush singh' }, {});

    expect(result.forModel.exists).toBe(true);
    expect(result.forModel.teacher.name).toBe('Aayush Singh Rajput');
    expect(result.publicResults[0].type).toBe('teacher');
  });

  it('checkTeacherExists reports not found rather than fabricating a match', async () => {
    const result = await toolRegistry.execute('checkTeacherExists', { name: 'Nobody Registered' }, {});

    expect(result.forModel).toEqual({ exists: false });
    expect(result.publicResults).toBeUndefined();
  });

  it('searchTeachers filters by subject and city against real records', async () => {
    await createTeacher({
      name: 'Math Teacher',
      preferredSubjects: ['Mathematics'],
      address: { ...validTeacherPayload().address, city: 'Dharan' },
    });
    await createTeacher({
      name: 'Science Teacher',
      preferredSubjects: ['Science'],
      address: { ...validTeacherPayload().address, city: 'Pokhara' },
    });

    const result = await toolRegistry.execute('searchTeachers', { subject: 'Mathematics', city: 'Dharan' }, {});

    expect(result.forModel.count).toBe(1);
    expect(result.forModel.teachers[0].name).toBe('Math Teacher');
  });

  it('searchTeachers returns zero results honestly when nothing matches', async () => {
    const result = await toolRegistry.execute('searchTeachers', { subject: 'Astrology' }, {});
    expect(result.forModel.count).toBe(0);
    expect(result.publicResults).toEqual([]);
  });

  it('getTeacherProfile returns full details by id', async () => {
    const { teacher } = await createTeacher({ name: 'Profile Teacher' });

    const result = await toolRegistry.execute('getTeacherProfile', { id: teacher._id.toString() }, {});

    expect(result.forModel.found).toBe(true);
    expect(result.forModel.teacher.name).toBe('Profile Teacher');
    expect(result.forModel.teacher.qualifications).toBeDefined();
  });

  it('getSubjects de-duplicates case-insensitively across real teachers', async () => {
    await createTeacher({ preferredSubjects: ['Physics'] });
    await createTeacher({ preferredSubjects: ['physics', 'Chemistry'] });

    const result = await toolRegistry.execute('getSubjects', {}, {});

    const physicsEntries = result.forModel.subjects.filter((s) => s.toLowerCase() === 'physics');
    expect(physicsEntries).toHaveLength(1);
    expect(result.forModel.subjects).toEqual(expect.arrayContaining(['Chemistry']));
  });

  it('getMyProfile refuses without an authenticated user', async () => {
    const result = await toolRegistry.execute('getMyProfile', {}, {});
    expect(result.forModel.error).toBe('AUTH_REQUIRED');
  });

  it('getMyProfile returns only the authenticated user\'s own profile', async () => {
    const { user } = await createTeacher({ name: 'Owner Teacher' });

    const result = await toolRegistry.execute('getMyProfile', {}, { user });

    expect(result.forModel.hasProfile).toBe(true);
    expect(result.forModel.profile.name).toBe('Owner Teacher');
  });

  it('searchPlatformKnowledge answers static questions without touching the database', async () => {
    const result = await toolRegistry.execute('searchPlatformKnowledge', { topic: 'how do I become a tutor' }, {});
    expect(result.forModel.found).toBe(true);
    expect(result.forModel.entries[0].id).toBe('how-to-register-tutor');
  });

  it('an unknown tool name fails safely instead of throwing', async () => {
    const result = await toolRegistry.execute('deleteEverything', {}, {});
    expect(result.forModel.error).toBe('UNKNOWN_TOOL');
  });
});
