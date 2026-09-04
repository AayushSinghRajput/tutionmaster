const request = require('supertest');
const app = require('../app');
const SupportTicket = require('../models/SupportTicket');
const Admin = require('../admin-panel-server/models/Admin');

describe('Support Ticket API Endpoints', () => {
  let adminToken;

  beforeEach(async () => {
    const passwordHash = await Admin.hashPassword('Password123!');
    const admin = await Admin.create({
      name: 'Admin Tester',
      email: `admin_${Date.now()}@example.com`,
      passwordHash,
      isSuperAdmin: true,
    });
    // Generate JWT token for admin
    const jwt = require('jsonwebtoken');
    const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'secret';
    adminToken = jwt.sign(
      { adminId: admin._id, email: admin.email, role: 'admin', isSuperAdmin: true },
      secret,
      { expiresIn: '1d' }
    );
  });

  it('allows public user to submit a support ticket (POST /api/support/tickets)', async () => {
    const res = await request(app)
      .post('/api/support/tickets')
      .send({
        name: 'Ram Shrestha',
        contactEmail: 'ram@example.com',
        contactPhone: '+9779800000001',
        category: 'Profile Setup',
        subject: 'Cannot upload profile avatar',
        message: 'I get an error whenever I try to upload my profile photo in JPG format.',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.ticketId).toMatch(/^TM-\d{4}$/);
    expect(res.body.data.status).toBe('Open');
  });

  it('allows admin to list, update status, and reply to tickets', async () => {
    // Create sample ticket
    const ticket = await SupportTicket.create({
      ticketId: 'TM-9999',
      name: 'Sita Sharma',
      contactEmail: 'sita@example.com',
      contactPhone: '+9779800000002',
      category: 'Job Vacancy',
      subject: 'Question about Math Vacancy',
      message: 'Is the Math vacancy in Dharan still open?',
      status: 'Open',
    });

    // 1. Admin GET list
    const listRes = await request(app)
      .get('/api/admin/support-tickets')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(listRes.status).toBe(200);
    expect(listRes.body.data.length).toBeGreaterThan(0);

    // 2. Admin PATCH status
    const statusRes = await request(app)
      .patch(`/api/admin/support-tickets/${ticket._id}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'In Progress' });
    expect(statusRes.status).toBe(200);
    expect(statusRes.body.data.status).toBe('In Progress');

    // 3. Admin POST reply
    const replyRes = await request(app)
      .post(`/api/admin/support-tickets/${ticket._id}/reply`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ replyMessage: 'Yes, the position is open! You can apply directly on TuitionMaster.', status: 'Resolved' });
    expect(replyRes.status).toBe(200);
    expect(replyRes.body.data.status).toBe('Resolved');
    expect(replyRes.body.data.adminReply.message).toContain('position is open');
  });
});
