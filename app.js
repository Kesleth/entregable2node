const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/user.routes');
const transferRouter = require('./routes/transfer.routes');

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

app.use('/api/v1/user', userRouter);

app.use('/api/v1/transfer', transferRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
