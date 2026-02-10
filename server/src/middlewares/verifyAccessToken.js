const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { admin } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.admin = admin;
    next();
  } catch (error) {
    console.log('Invalid access token', error);
    res.sendStatus(403);
  }
}

module.exports = verifyAccessToken;
