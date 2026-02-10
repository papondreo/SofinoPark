const express = require('express');
const morgan = require('morgan');
const path = require('path');
const adminRouter = require('./routes/adminRouter');
const tokensRouter = require('./routes/tokensRouter');
const housesRouter = require('./routes/housesRouter');
const sectorRouter = require('./routes/sectorRouter');
const cookieParser = require('cookie-parser');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/admin', adminRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/sectors', sectorRouter);
app.use('/api/cottages', housesRouter);

app.use(express.static(path.join(__dirname, '..', 'dist'))); // деплой проекта
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
