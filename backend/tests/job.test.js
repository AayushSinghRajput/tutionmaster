const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Job = require('../models/Job');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let userToken;

beforeEach(async () => {
  await Job.deleteMany({});
  await User.deleteMany({});

  const user = await User.create({
    username: 'testtutor',
    email: 'tutor@test.com',
    password: 'password123',
    role: 'teacher',
  });

  userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
});

describe('Public & Protected Job Board Endpoints', () => {
  test('GET /api/v1/jobs should return paginated list of published open jobs with limit 9', async () => {
    const jobDocs = [];
    for (let i = 1; i <= 10; i++) {
      jobDocs.push({
        title: `Tuition Vacancy ${i}`,
        slug: `tuition-vacancy-${i}`,
        location: `Kathmandu Area ${i}`,
        gradeLevel: `Grade ${i}`,
        published: true,
        status: 'Open',
        publishedAt: new Date(Date.now() - i * 1000),
      });
    }
    jobDocs.push({
      title: 'Closed Vacancy',
      slug: 'closed-vacancy',
      location: 'Patan',
      gradeLevel: 'Grade 10',
      published: true,
      status: 'Closed',
    });

    await Job.insertMany(jobDocs);

    const res = await request(app).get('/api/v1/jobs?page=1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.jobs.length).toBe(9); // Limit 9
    expect(res.body.pagination.totalCount).toBe(10);
    expect(res.body.pagination.totalPages).toBe(2);
    expect(res.body.pagination.hasNextPage).toBe(true);
  });

  test('GET /api/v1/jobs/slug/:slug should deny unauthenticated access (401)', async () => {
    await Job.create({
      title: 'Grade 10 Math Vacancy',
      slug: 'grade-10-math-vacancy',
      location: 'Baneshwor',
      gradeLevel: 'Class 10',
      published: true,
    });

    const res = await request(app).get('/api/v1/jobs/slug/grade-10-math-vacancy');
    expect(res.statusCode).toEqual(401);
  });

  test('GET /api/v1/jobs/slug/:slug should return details for authenticated users', async () => {
    await Job.create({
      title: 'Grade 10 Math Vacancy',
      slug: 'grade-10-math-vacancy',
      location: 'Baneshwor',
      gradeLevel: 'Class 10',
      published: true,
    });

    const res = await request(app)
      .get('/api/v1/jobs/slug/grade-10-math-vacancy')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Grade 10 Math Vacancy');
  });
});
