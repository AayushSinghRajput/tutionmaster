const request = require('supertest');
const app = require('../app');
const { uniqueEmail } = require('./helpers');

describe('auth', () => {
  it('registers a new user', async () => {
    const email = uniqueEmail();
    const res = await request(app).post('/api/auth/register').send({
      username: 'New User',
      email,
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.user.role).toBe('teacher');
  });

  it('rejects registration when passwords do not match', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'New User',
      email: uniqueEmail(),
      password: 'password123',
      confirmPassword: 'different123',
    });
    expect(res.status).toBe(400);
  });

  it('rejects a duplicate email', async () => {
    const email = uniqueEmail();
    const payload = {
      username: 'Dup User',
      email,
      password: 'password123',
      confirmPassword: 'password123',
    };
    await request(app).post('/api/auth/register').send(payload).expect(201);
    const res = await request(app).post('/api/auth/register').send(payload);
    expect(res.status).toBe(400);
  });

  it('logs in with correct credentials and rejects wrong password', async () => {
    const email = uniqueEmail();
    await request(app).post('/api/auth/register').send({
      username: 'Login User',
      email,
      password: 'password123',
      confirmPassword: 'password123',
    });

    const good = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'password123' });
    expect(good.status).toBe(200);
    expect(good.body.token).toBeDefined();

    const bad = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'wrongpassword' });
    expect(bad.status).toBe(401);
  });
});
