const { Router } = require('express');
const verifyRefreshToken = require('../middlewares/verifyRefreshToken');
const generateTokens = require('../services/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const tokensRouter = Router();

tokensRouter.get('/refresh', verifyRefreshToken, async (req, res) => {
  const { admin } = res.locals;
  const { accessToken, refreshToken } = generateTokens({ admin });
  res.cookie('refreshToken', refreshToken, cookiesConfig).json({ admin, accessToken });
});

module.exports = tokensRouter;
