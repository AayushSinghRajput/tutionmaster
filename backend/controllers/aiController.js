const asyncHandler = require('../middleware/asyncHandler');
const agent = require('../services/ai/agent');
const logger = require('../utils/logger');

// @desc    Chat with the TuitionMaster AI assistant
// @route   POST /api/ai/chat
// @access  Public (optionalAuth — richer/authorized answers when logged in)
exports.chat = asyncHandler(async (req, res) => {
  const { message, history } = req.body;
  const startedAt = Date.now();

  const result = await agent.chat({ message, history, user: req.user });

  logger.info(
    `AI chat handled in ${Date.now() - startedAt}ms (auth: ${Boolean(req.user)}, results: ${result.results.length})`,
  );

  res.status(200).json({
    success: true,
    message: result.message,
    results: result.results,
  });
});
