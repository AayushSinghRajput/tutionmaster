const { Resend } = require('resend');
const logger = require('../utils/logger');

// Initialize Resend Client
const getResendClient = () => {
  const apiKey =
    process.env.RESEND_API_KEY ||
    (process.env.SMTP_PASS && process.env.SMTP_PASS.startsWith('re_') ? process.env.SMTP_PASS : null);

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
};

// Generic dispatch function using Resend
const sendEmail = async ({ from, to, subject, html }) => {
  const sender = from || process.env.FROM_EMAIL || 'TuitionMaster <onboarding@tuitionmaster.guru>';
  const resend = getResendClient();

  if (!resend) {
    logger.warn(`[EMAIL] Resend API Key is missing. Simulating email send to ${to}`);
    return { id: 'simulated-' + Date.now() };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to,
      subject,
      html,
    });

    if (error) {
      logger.error(`[EMAIL] Resend error delivering to ${to}:`, error);
      throw new Error(error.message || 'Resend email delivery failed');
    }

    logger.info(`[EMAIL] Email successfully sent via Resend to ${to} (ID: ${data?.id})`);
    return data;
  } catch (err) {
    logger.error(`[EMAIL] Exception sending email via Resend to ${to}:`, err);
    throw err;
  }
};

/**
 * Send onboarding email to a tutor after an admin manually creates their profile.
 */
exports.sendManualTutorOnboardingEmail = async ({ user, teacher, sendNotification = true }) => {
  if (!sendNotification) return;

  const userEmail = user.email;
  const userName = teacher.name || user.username || 'Tutor';
  const isGoogleUser = Boolean(user.googleId);
  const frontendUrl = process.env.FRONTEND_URL || 'https://www.tuitionmaster.guru';
  const loginUrl = `${frontendUrl}/login`;
  const profileEditUrl = `${frontendUrl}/dashboard`;

  const subject = `Good news! Your tutor profile is now live on TuitionMaster`;

  const subjectsList = Array.isArray(teacher.preferredSubjects)
    ? teacher.preferredSubjects.join(', ')
    : 'Not specified';
  const city = teacher.address?.city || 'Your city';

  const authInstructionsHtml = isGoogleUser
    ? `
      <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 6px;">
        <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 15px;">Google Account Detected</h4>
        <p style="margin: 0; color: #475569; font-size: 14px;">
          You can log in anytime by simply clicking <strong>"Continue with Google"</strong> using your registered email address (<code>${userEmail}</code>).
        </p>
      </div>
    `
    : `
      <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 6px;">
        <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 15px;">Email Login Instructions</h4>
        <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;">
          You can log in anytime using your registered email address (<code>${userEmail}</code>) and the password you created during signup.
        </p>
        <p style="margin: 0; font-size: 13px; color: #64748b;">
          Forgot your password? You can reset it anytime from the <a href="${loginUrl}" style="color: #2563eb; text-decoration: underline;">Login Page</a>.
        </p>
      </div>
    `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 20px; color: #334155; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .content { padding: 32px 24px; }
        .summary-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; }
        .btn { display: inline-block; background-color: #2563eb; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; margin-top: 16px; text-align: center; }
        .footer { text-align: center; padding: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">TuitionMaster</h1>
          <p style="margin: 6px 0 0 0; color: #93c5fd; font-size: 14px;">Connecting Nepal's Best Tutors with Students</p>
        </div>
        
        <div class="content">
          <h2 style="margin-top: 0; color: #0f172a; font-size: 20px;">Hello ${userName},</h2>
          
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Our support team noticed that you registered on TuitionMaster but hadn't finished setting up your tutor profile. 
            To help you start receiving student inquiries right away, our team has prepared and published an initial tutor profile on your behalf!
          </p>

          <div class="summary-box">
            <h3 style="margin-top: 0; font-size: 16px; color: #1e293b;">📋 Profile Preview</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600; width: 140px;">Full Name:</td>
                <td style="padding: 6px 0;">${teacher.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Location:</td>
                <td style="padding: 6px 0;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Subjects:</td>
                <td style="padding: 6px 0;">${subjectsList}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Teaching Mode:</td>
                <td style="padding: 6px 0;">${teacher.teachingMode}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Monthly Fee:</td>
                <td style="padding: 6px 0;">₨ ${(teacher.monthlyRate || (teacher.hourlyRate ? teacher.hourlyRate * 20 : 0)).toLocaleString()} / month</td>
              </tr>
            </table>
          </div>

          ${authInstructionsHtml}

          <div style="text-align: center; margin-top: 28px;">
            <a href="${profileEditUrl}" class="btn">Review & Edit My Profile</a>
          </div>
        </div>

        <div class="footer">
          <p>© ${new Date().getFullYear()} TuitionMaster. All rights reserved.</p>
          <p>If you have any questions or wish to update your profile, log in to your dashboard or reply directly to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html: htmlContent,
  });
};

/**
 * Send password reset email with secure token link via Resend.
 */
exports.sendPasswordResetEmail = async ({ user, resetUrl }) => {
  const userEmail = user.email;
  const userName = user.username || 'User';
  const subject = `Reset Your TuitionMaster Password`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #334155; }
        .card { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #701a35 0%, #881337 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .content { padding: 32px 28px; }
        .btn-container { text-align: center; margin: 32px 0; }
        .btn { display: inline-block; background-color: #881337; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; box-shadow: 0 4px 12px rgba(136, 19, 55, 0.25); }
        .btn:hover { background-color: #701a35; }
        .security-notice { background-color: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; padding: 14px 16px; border-radius: 8px; margin: 24px 0; font-size: 13px; color: #92400e; }
        .url-box { background-color: #f1f5f9; padding: 12px; border-radius: 8px; font-size: 12px; word-break: break-all; color: #64748b; margin-top: 16px; }
        .footer { text-align: center; padding: 20px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">TuitionMaster</h1>
          <p style="margin: 6px 0 0 0; color: #fecdd3; font-size: 13px;">Password Reset Request</p>
        </div>
        
        <div class="content">
          <h2 style="margin-top: 0; color: #0f172a; font-size: 19px;">Hello ${userName},</h2>
          
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            We received a request to reset your password for your <strong>TuitionMaster</strong> account. Click the button below to choose a new password:
          </p>

          <div class="btn-container">
            <a href="${resetUrl}" class="btn">Reset My Password</a>
          </div>

          <div class="security-notice">
            <strong>Security Notice:</strong> This password reset link is valid for <strong>15 minutes</strong>. If you did not request a password reset, you can safely ignore this email—your account remains secure.
          </div>

          <p style="font-size: 13px; color: #64748b; margin-bottom: 6px;">
            If the button above does not work, copy and paste this URL into your browser:
          </p>
          <div class="url-box">
            <a href="${resetUrl}" style="color: #881337; text-decoration: underline;">${resetUrl}</a>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} TuitionMaster. All rights reserved.</p>
          <p style="margin: 0;">Need help? Reply to this email or visit our support page.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject,
    html: htmlContent,
  });
};

exports.sendEmail = sendEmail;
