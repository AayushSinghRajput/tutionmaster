const request = require('supertest');
const User = require('../models/User');

let counter = 0;
function uniqueEmail() {
  counter += 1;
  return `user${counter}_${Date.now()}@example.com`;
}

// Registers a user through the real HTTP endpoint and returns the token.
async function registerUser(app, overrides = {}) {
  const email = overrides.email || uniqueEmail();
  const password = overrides.password || 'password123';
  const res = await request(app).post('/api/auth/register').send({
    username: overrides.username || 'Test User',
    email,
    password,
    confirmPassword: password,
  });
  if (res.status !== 201) {
    throw new Error(`registerUser failed: ${res.status} ${JSON.stringify(res.body)}`);
  }
  return { token: res.body.token, user: res.body.user, email, password };
}

async function makeAdmin(email) {
  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: 'admin' },
    { new: true }
  );
  return user;
}

function validTeacherPayload(overrides = {}) {
  return {
    name: 'Jane Doe',
    avatarPublicId: 'test/avatars/default',
    cvPublicId: 'test/cvs/default',
    address: {
      street: '123 Main St',
      city: 'Kathmandu',
      state: 'Bagmati',
      zipCode: 44600,
    },
    qualifications: [{ degree: 'BSc', institution: 'TU', year: 2018 }],
    contact: { email: 'jane.doe@example.com', phone: '+9779800000000' },
    preferredSubjects: ['Math'],
    bio: 'x'.repeat(60),
    experience: 5,
    availability: ['Monday'],
    teachingMode: 'Online',
    hourlyRate: 500,
    ...overrides,
  };
}

module.exports = { registerUser, makeAdmin, validTeacherPayload, uniqueEmail };
