const request = require('supertest');
const app = require('../app');

describe('GET /api/health', () => {
  it('reports the database as connected', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.db).toBe('connected');
  });
});
