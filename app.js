/** @format */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const hrRouter = require('./routes/hrRoutes');
const authRouter = require('./routes/authRoutes');
const employeeRouter = require('./routes/EmployeeRoute');
const visaRouter = require('./routes/visaRoutes');
const emHouseRouter = require('./routes/emHouseRoutes');
const hrHouseRouter = require('./routes/hrHouseRoutes');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4200'], // React vite app(5173), Angular app(4200)
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(express.static('views'));

app.use('/api/hr', hrRouter);
app.use('/api/auth', authRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/visa', visaRouter);
app.use('/api/employee/house', emHouseRouter);
app.use('/api/hr/house', hrHouseRouter);

app.all('*', (_req, res) => {
  return res.status(404).json({ message: '404 Page Not Found' });
});

module.exports = app;
