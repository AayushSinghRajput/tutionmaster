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

/**
 * Send email when tutor profile is verified & approved by admin (made public)
 */
exports.sendTutorProfileApprovedEmail = async ({ user, teacher }) => {
  const recipientEmail = teacher.contact?.email || user?.email;
  if (!recipientEmail) {
    logger.warn(`[EMAIL] No recipient email found for tutor profile ${teacher._id}`);
    return null;
  }

  const tutorName = teacher.name || user?.username || "Tutor";
  const frontendUrl = process.env.FRONTEND_URL || "https://www.tuitionmaster.guru";
  const publicProfileUrl = `${frontendUrl}/teachers/${teacher._id}`;
  const dashboardUrl = `${frontendUrl}/dashboard`;

  const subject = `🎉 Congratulations! Your TuitionMaster profile is approved & live`;

  const subjectsList = Array.isArray(teacher.preferredSubjects) && teacher.preferredSubjects.length > 0
    ? teacher.preferredSubjects.join(", ")
    : "General Tutoring";
  const city = teacher.address?.city || "Nepal";
  const monthlyRateFormatted = teacher.monthlyRate
    ? `₨ ${Number(teacher.monthlyRate).toLocaleString()} / month`
    : teacher.hourlyRate
    ? `₨ ${Number(teacher.hourlyRate).toLocaleString()} / hour`
    : "Negotiable";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #334155; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #065f46 0%, #059669 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .content { padding: 32px 28px; }
        .badge { display: inline-block; background-color: #d1fae5; color: #065f46; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .summary-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0; }
        .btn-container { text-align: center; margin: 28px 0; }
        .btn-primary { display: inline-block; background-color: #059669; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 15px; margin: 6px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25); }
        .btn-secondary { display: inline-block; background-color: #f1f5f9; color: #1e293b !important; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 15px; margin: 6px; border: 1px solid #cbd5e1; }
        .tips-box { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 13.5px; color: #1e40af; line-height: 1.5; }
        .footer { text-align: center; padding: 20px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">TuitionMaster</h1>
          <p style="margin: 6px 0 0 0; color: #a7f3d0; font-size: 14px;">Nepal's Premier Tutoring Network</p>
        </div>
        
        <div class="content">
          <span class="badge">Verified & Published</span>
          <h2 style="margin-top: 4px; color: #0f172a; font-size: 20px;">Great news, ${tutorName}!</h2>
          
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Our verification team has throughly reviewed your credentials. Your tutor profile has been <strong>approved</strong> and is now publicly live on TuitionMaster!
          </p>

          <div class="summary-box">
            <h3 style="margin-top: 0; font-size: 15px; color: #1e293b; margin-bottom: 12px;">📋 Your Live Profile Overview</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600; width: 130px; color: #64748b;">Full Name:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${teacher.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Location:</td>
                <td style="padding: 6px 0;">${city}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Subjects:</td>
                <td style="padding: 6px 0;">${subjectsList}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Mode:</td>
                <td style="padding: 6px 0;">${teacher.teachingMode}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Tuition Fee:</td>
                <td style="padding: 6px 0; font-weight: 600; color: #059669;">${monthlyRateFormatted}</td>
              </tr>
            </table>
          </div>

          <div class="btn-container">
            <a href="${publicProfileUrl}" class="btn-primary">View My Public Profile</a>
            <a href="${dashboardUrl}" class="btn-secondary">Go to Dashboard</a>
          </div>

          <div class="tips-box">
            <strong>💡 Pro Tip:</strong> Share your public profile link on your WhatsApp status, LinkedIn, or Facebook to get direct tutoring leads from parents and students looking for quality mentors!
          </div>

          <p style="font-size: 13px; color: #64748b; margin-top: 20px;">
            If you ever need to update your schedule, subjects, or pricing, you can do so anytime from your <a href="${dashboardUrl}" style="color: #059669; font-weight: 600;">Dashboard</a>.
          </p>
        </div>

        <div class="footer">
          <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} TuitionMaster. All rights reserved.</p>
          <p style="margin: 0;">Connecting passionate tutors with eager learners.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: recipientEmail,
    subject,
    html: htmlContent,
  });
};

/**
 * Send email when admin requests document/profile resubmission from tutor
 */
exports.sendTutorResubmissionEmail = async ({ user, teacher, reason, feedbackNotes }) => {
  const recipientEmail = teacher.contact?.email || user?.email;
  if (!recipientEmail) {
    logger.warn(`[EMAIL] No recipient email found for tutor profile ${teacher._id}`);
    return null;
  }

  const tutorName = teacher.name || user?.username || "Tutor";
  const frontendUrl = process.env.FRONTEND_URL || "https://www.tuitionmaster.guru";
  const editProfileUrl = `${frontendUrl}/dashboard`;

  const subject = `⚠️ Action Required: Updates needed for your TuitionMaster profile`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #334155; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #b45309 0%, #d97706 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .content { padding: 32px 28px; }
        .badge { display: inline-block; background-color: #fef3c7; color: #92400e; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .feedback-box { background: #fffbeb; border: 1px solid #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 18px; margin: 24px 0; }
        .btn-container { text-align: center; margin: 28px 0; }
        .btn-primary { display: inline-block; background-color: #d97706; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25); }
        .footer { text-align: center; padding: 20px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">TuitionMaster</h1>
          <p style="margin: 6px 0 0 0; color: #fde68a; font-size: 14px;">Profile Verification Update</p>
        </div>
        
        <div class="content">
          <span class="badge">Action Required</span>
          <h2 style="margin-top: 4px; color: #0f172a; font-size: 20px;">Hello ${tutorName},</h2>
          
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Thank you for registering on TuitionMaster! Our verification team has reviewed your application. Before we can publish your profile publicly, there are a few items that need your attention:
          </p>

          <div class="feedback-box">
            <h4 style="margin: 0 0 8px 0; color: #92400e; font-size: 15px;">Review Details:</h4>
            ${reason ? `<p style="margin: 0 0 8px 0; font-size: 14px; color: #78350f;"><strong>Reason:</strong> ${reason}</p>` : ""}
            ${feedbackNotes ? `<p style="margin: 0; font-size: 14px; color: #78350f;"><strong>Admin Note:</strong> ${feedbackNotes}</p>` : ""}
          </div>

          <p style="font-size: 14.5px; line-height: 1.6; color: #475569;">
            Please log in to your dashboard to update the requested information or re-upload your document. Once updated, our team will review it promptly so your profile can go live.
          </p>

          <div class="btn-container">
            <a href="${editProfileUrl}" class="btn-primary">Update & Resubmit Profile</a>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} TuitionMaster. All rights reserved.</p>
          <p style="margin: 0;">Need help? Reply directly to this email for assistance.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: recipientEmail,
    subject,
    html: htmlContent,
  });
};

/**
 * Send email when admin rejects a tutor profile
 */
exports.sendTutorRejectionEmail = async ({ user, teacher, reason, feedbackNotes }) => {
  const recipientEmail = teacher.contact?.email || user?.email;
  if (!recipientEmail) {
    logger.warn(`[EMAIL] No recipient email found for tutor profile ${teacher._id}`);
    return null;
  }

  const tutorName = teacher.name || user?.username || "Tutor";
  const frontendUrl = process.env.FRONTEND_URL || "https://www.tuitionmaster.guru";
  const supportUrl = `${frontendUrl}/contact`;

  const subject = `Update regarding your TuitionMaster tutor application`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px 12px; color: #334155; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0; }
        .header { background: linear-gradient(135deg, #334155 0%, #475569 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
        .content { padding: 32px 28px; }
        .feedback-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #64748b; border-radius: 8px; padding: 18px; margin: 24px 0; }
        .btn-container { text-align: center; margin: 28px 0; }
        .btn-primary { display: inline-block; background-color: #475569; color: #ffffff !important; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-size: 15px; }
        .footer { text-align: center; padding: 20px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 style="margin: 0; font-size: 24px; font-weight: 700;">TuitionMaster</h1>
          <p style="margin: 6px 0 0 0; color: #cbd5e1; font-size: 14px;">Application Status</p>
        </div>
        
        <div class="content">
          <h2 style="margin-top: 4px; color: #0f172a; font-size: 20px;">Hello ${tutorName},</h2>
          
          <p style="font-size: 15px; line-height: 1.6; color: #475569;">
            Thank you for your interest in joining TuitionMaster. After careful review of your tutor application and submitted materials, we regret to inform you that we are unable to approve your tutor profile at this time.
          </p>

          <div class="feedback-box">
            <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 15px;">Reason:</h4>
            <p style="margin: 0 0 6px 0; font-size: 14px; color: #475569;">${reason || "Does not meet current platform requirements"}</p>
            ${feedbackNotes ? `<p style="margin: 6px 0 0 0; font-size: 13.5px; color: #64748b;"><em>Note: ${feedbackNotes}</em></p>` : ""}
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #64748b;">
            If you have questions or believe this decision was made in error, please feel free to reach out to our support team.
          </p>

          <div class="btn-container">
            <a href="${supportUrl}" class="btn-primary">Contact Support</a>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} TuitionMaster. All rights reserved.</p>
          <p style="margin: 0;">TuitionMaster Support Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: recipientEmail,
    subject,
    html: htmlContent,
  });
};

exports.sendEmail = sendEmail;
