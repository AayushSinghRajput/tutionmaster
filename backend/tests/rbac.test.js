const request = require('supertest');
const app = require('../app');
const { registerUser, makeAdmin, validTeacherPayload } = require('./helpers');

describe('teacher moderation (admin-only)', () => {
  it('rejects a non-admin', async () => {
    const owner = await registerUser(app);
    const created = await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${owner.token}`)
      .send(validTeacherPayload());
    const teacherId = created.body.data._id;

    const res = await request(app)
      .patch(`/api/teachers/${teacherId}/status`)
      .set('Authorization', `Bearer ${owner.token}`)
      .send({ isActive: false });

    expect(res.status).toBe(403);
  });

  it('allows an admin to deactivate a teacher profile', async () => {
    const owner = await registerUser(app);
    const admin = await registerUser(app);
    await makeAdmin(admin.email);

    const created = await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${owner.token}`)
      .send(validTeacherPayload());
    const teacherId = created.body.data._id;

    const res = await request(app)
      .patch(`/api/teachers/${teacherId}/status`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send({ isActive: false });

    expect(res.status).toBe(200);
    expect(res.body.data.isActive).toBe(false);
  });
});
