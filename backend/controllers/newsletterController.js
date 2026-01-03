const { isValidEmail } = require("../validators/newsletterValidator");
const { saveEmail } = require("../services/newsletterService");

exports.subscribeNewsletter = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Newsletter error:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again."
    });
  }
};
