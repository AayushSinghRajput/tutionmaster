const { isValidEmail } = require("../validators/newsletterValidator");
const { saveEmail } = require("../services/newsletterService");
const asyncHandler = require("../middleware/asyncHandler");

exports.subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      message: "Please enter a valid email address."
    });
  }

  const result = await saveEmail(email);

  if (result.exists) {
    return res.status(400).json({
      message: "This email is already subscribed."
    });
  }

  return res.status(200).json({
    message: "Subscribed successfully! 🎉"
  });
});
