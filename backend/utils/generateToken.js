const jwt = require('jsonwebtoken');

// Generate short-lived access token (15 minutes)
const generateAccessToken = (userId, tokenVersion = 0) => {
    return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
};

// Generate long-lived refresh token (7 days)
const generateRefreshToken = (userId, tokenVersion = 0) => {
    return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

module.exports = { generateAccessToken, generateRefreshToken };