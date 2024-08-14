/** @format */

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/AuthRoutes');
const productRouter = require('./routes/ProductRoutes');
const favoriteRouter = require('./routes/FavoriteRoutes');
const adminRouter = require('./routes/AdminRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4001',
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(express.static('views'));

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/admin', adminRouter);

app.all('*', (_req, res) => {
  return res.status(404).json({ message: '404 Page Not Found' });
});

module.exports = app;
