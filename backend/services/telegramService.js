const logger = require("../utils/logger");

/**
 * Escapes characters that have special meaning in Telegram HTML mode.
 * Telegram supports <b>, <i>, <a>, <code>, <pre> in HTML parse_mode.
 */
const escapeHtml = (text) => {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

/**
 * Send a notification to Telegram when a new tutor creates their profile.
 *
 * @param {Object} params
 * @param {Object} params.teacher - Newly created Teacher mongoose document or plain object
 * @param {Object} [params.user] - Associated User object (req.user)
 * @returns {Promise<boolean>}
 */
const notifyNewTutorRegistered = async ({ teacher, user }) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    logger.warn(
      "[TELEGRAM] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing in environment. Skipping Telegram alert."
    );
    return false;
  }

  try {
    const name = escapeHtml(teacher.name || user?.username || "New Tutor");
    const email = escapeHtml(teacher.contact?.email || user?.email || "Not provided");
    const phone = escapeHtml(teacher.contact?.phone || "Not provided");
    const city = escapeHtml(teacher.address?.city || "N/A");
    const state = escapeHtml(teacher.address?.state || "");
    const location = state ? `${city}, ${state}` : city;

    const subjects =
      Array.isArray(teacher.preferredSubjects) && teacher.preferredSubjects.length > 0
        ? escapeHtml(teacher.preferredSubjects.join(", "))
        : "Not specified";

    const teachingMode = escapeHtml(teacher.teachingMode || "Not specified");

    let rate = "Negotiable";
    if (teacher.hourlyRate) {
      rate = `NPR ${teacher.hourlyRate} / hr`;
    } else if (teacher.monthlyRate) {
      rate = `NPR ${teacher.monthlyRate} / mo`;
    }

    const adminOrigin =
      process.env.ADMIN_PANEL_ORIGIN || "https://tutionmaster-adminpanel.vercel.app";
    const adminReviewUrl = `${adminOrigin.replace(/\/$/, "")}/teachers/${teacher._id}`;

    const message = [
      `🎓 <b>New Tutor Registered on TuitionMaster!</b>`,
      ``,
      `👤 <b>Name:</b> ${name}`,
      `📧 <b>Email:</b> ${email}`,
      `📞 <b>Phone:</b> ${phone}`,
      `📍 <b>Location:</b> ${location}`,
      `📚 <b>Subjects:</b> ${subjects}`,
      `💼 <b>Mode:</b> ${teachingMode}`,
      `💰 <b>Rate:</b> ${rate}`,
      ``,
      `⚡ <i>Open Admin Panel to review and publish this profile:</i>`,
    ].join("\n");

    const payload = {
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔍 Review in Admin Panel",
              url: adminReviewUrl,
            },
          ],
        ],
      },
    };

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      logger.error(
        `[TELEGRAM] Failed to deliver alert: ${data.description || response.statusText}`
      );
      return false;
    }

    logger.info(
      `[TELEGRAM] New tutor alert successfully sent for tutor ${teacher._id} (chat_id: ${chatId})`
    );
    return true;
  } catch (err) {
    logger.error(`[TELEGRAM] Exception sending alert: ${err.message}`);
    return false;
  }
};

module.exports = {
  notifyNewTutorRegistered,
};
