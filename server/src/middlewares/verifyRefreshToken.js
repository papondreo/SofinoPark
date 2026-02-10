const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { admin } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.admin = admin;
    next();
  } catch (error) {
    console.log('Invalid refresh token', error);
    res.clearCookie('refreshToken').sendStatus(401);
  }
}

module.exports = verifyRefreshToken;
