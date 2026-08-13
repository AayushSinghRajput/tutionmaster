const request = require('supertest');
const app = require('../app');
const { registerUser, validTeacherPayload } = require('./helpers');

describe('teacher profile', () => {
  it('ignores userId/isActive in the create request body (mass-assignment fix)', async () => {
    const owner = await registerUser(app);
    const intruder = await registerUser(app);

    const res = await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${owner.token}`)
      .send(validTeacherPayload({ userId: intruder.user.id, isActive: false }));

    expect(res.status).toBe(201);
    expect(res.body.data.userId._id || res.body.data.userId).not.toBe(intruder.user.id);
    expect(res.body.data.isActive).toBe(true);
  });

  it('rejects updates from a non-owner', async () => {
    const owner = await registerUser(app);
    const other = await registerUser(app);

    const created = await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${owner.token}`)
      .send(validTeacherPayload());
    const teacherId = created.body.data._id;

    const res = await request(app)
      .put(`/api/teachers/${teacherId}`)
      .set('Authorization', `Bearer ${other.token}`)
      .send(validTeacherPayload({ name: 'Hijacked' }));

    expect(res.status).toBe(403);
  });

  it('ignores userId/isActive in the update request body', async () => {
    const owner = await registerUser(app);
    const intruder = await registerUser(app);

    const created = await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${owner.token}`)
      .send(validTeacherPayload());
    const teacherId = created.body.data._id;

    const res = await request(app)
      .put(`/api/teachers/${teacherId}`)
      .set('Authorization', `Bearer ${owner.token}`)
      .send(validTeacherPayload({ userId: intruder.user.id, isActive: false }));

    expect(res.status).toBe(200);
    expect(res.body.data.userId._id || res.body.data.userId).not.toBe(intruder.user.id);
    expect(res.body.data.isActive).toBe(true);
  });

  it('does not crash on regex metacharacters and matches them literally (ReDoS fix)', async () => {
    const owner = await registerUser(app);
    await request(app)
      .post('/api/teachers')
      .set('Authorization', `Bearer ${owner.token}`)
      .send(validTeacherPayload({ name: 'C++ Expert' }));

    // An unescaped "(" would throw "Invalid regular expression" and 500.
    const brokenPattern = await request(app).get('/api/teachers/search').query({ q: '(' });
    expect(brokenPattern.status).toBe(200);

    const literalMatch = await request(app).get('/api/teachers/search').query({ q: 'C++' });
    expect(literalMatch.status).toBe(200);
    expect(literalMatch.body.data.some((t) => t.name === 'C++ Expert')).toBe(true);
  });

  it('paginates and does not error on out-of-range limit values', async () => {
    const owner1 = await registerUser(app);
    const owner2 = await registerUser(app);
    const owner3 = await registerUser(app);
    for (const owner of [owner1, owner2, owner3]) {
      await request(app)
        .post('/api/teachers')
        .set('Authorization', `Bearer ${owner.token}`)
        .send(validTeacherPayload());
    }

    const paged = await request(app).get('/api/teachers').query({ limit: 2 });
    expect(paged.status).toBe(200);
    expect(paged.body.count).toBe(2);
    expect(paged.body.pagination.pages).toBe(Math.ceil(3 / 2));

    const weird = await request(app).get('/api/teachers').query({ limit: '0' });
    expect(weird.status).toBe(200);
    expect(weird.body.count).toBeGreaterThan(0);

    const huge = await request(app).get('/api/teachers').query({ limit: 999999 });
    expect(huge.status).toBe(200);
    expect(huge.body.count).toBeLessThanOrEqual(50);
  });
});
