const express = require("express");
const router = express.Router();
const { subscribeNewsletter } = require("../controllers/newsletterController");

/**
 * @openapi
 * /newsletter/subscribe:
 *   post:
 *     summary: Subscribe an email address to the newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email }
 *     responses:
 *       200:
 *         description: Subscribed
 *       400:
 *         description: Validation error
 */
router.post("/subscribe", subscribeNewsletter);

module.exports = router;
