const request = require('supertest');
const app = require('../app');
const { registerUser } = require('./helpers');

describe('token revocation', () => {
  it('rejects a token after logout', async () => {
    const { token } = await registerUser(app);

    const before = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(before.status).toBe(200);

    const logoutRes = await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);
    expect(logoutRes.status).toBe(200);

    const after = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(after.status).toBe(401);
  });

  it('lets a fresh login after logout issue a working token', async () => {
    const { token, email, password } = await registerUser(app);

    await request(app).post('/api/auth/logout').set('Authorization', `Bearer ${token}`);

    const login = await request(app).post('/api/auth/login').send({ email, password });
    expect(login.status).toBe(200);

    const me = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${login.body.token}`);
    expect(me.status).toBe(200);
  });
});
