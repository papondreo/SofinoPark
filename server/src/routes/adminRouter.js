/* eslint-disable consistent-return */
const { Router } = require('express');
const { Admin } = require('../../db/models');
const generateTokens = require('../services/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');
const bcrypt = require('bcrypt');

const adminRouter = Router();

adminRouter.post('/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Заполни все поля' });
  }

  const targetUser = await Admin.findOne({ where: { login } });
  if (!targetUser) return res.status(400).json({ message: 'Ошибка входа' });

  const isPasswordValid = await bcrypt.compare(password, targetUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Ошибка входа' });
  }

  const admin = targetUser.get();

  delete admin.password;
  delete admin.createdAt;

  const { accessToken, refreshToken } = generateTokens({ admin });
  res.cookie('refreshToken', refreshToken, cookiesConfig).json({ admin, accessToken });
});
adminRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = adminRouter;
