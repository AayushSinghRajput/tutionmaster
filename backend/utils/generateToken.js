const jwt = require('jsonwebtoken');

//function to generate the token
const generateToken = (userId, tokenVersion = 0) => {
    return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = generateToken;