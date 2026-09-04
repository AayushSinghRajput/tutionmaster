const request = require('supertest');
const app = require('../app');
const Teacher = require('../models/Teacher');
const { registerUser } = require('./helpers');

describe('POST /api/teachers/:id/share - Profile Share Endpoint', () => {
  let owner, other, teacherProfile;

  beforeEach(async () => {
    owner = await registerUser(app, { username: 'owner_tutor' });
    other = await registerUser(app, { username: 'other_user' });

    teacherProfile = await Teacher.create({
      userId: owner.user._id || owner.user.id,
      name: 'Jane Doe',
      address: { street: 'Main St', city: 'Kathmandu', state: 'Bagmati' },
      qualifications: [{ degree: 'B.Sc Physics', institution: 'TU', year: 2020 }],
      contact: { email: 'jane@example.com', phone: '+9779800000000' },
      preferredSubjects: ['Physics', 'Mathematics'],
      hourlyRate: 500,
      teachingMode: 'Both',
      experience: 4,
      availability: ['Monday', 'Wednesday'],
      isActive: true,
      isVisible: true,
    });
  });

  it('allows profile owner to generate share metadata', async () => {
    const res = await request(app)
      .post(`/api/teachers/${teacherProfile._id}/share`)
      .set('Authorization', `Bearer ${owner.token}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.shareUrl).toContain(`/teachers/${teacherProfile._id}`);
  });

  it('rejects unauthorized user (non-owner) with 403 Forbidden', async () => {
    const res = await request(app)
      .post(`/api/teachers/${teacherProfile._id}/share`)
      .set('Authorization', `Bearer ${other.token}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toContain('Forbidden');
  });

  it('rejects unauthenticated guest requests with 401 Unauthorized', async () => {
    const res = await request(app)
      .post(`/api/teachers/${teacherProfile._id}/share`);

    expect(res.status).toBe(401);
  });
});
