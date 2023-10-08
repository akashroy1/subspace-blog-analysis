const AppError = require('./AppError')

const handleJWTError = () =>
  new AppError(`Invalid token. Please login again`, 401);


const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error: ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'DEVELOPMENT') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'PRODUCTION') {
    let error;
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    
    if (error) sendErrorProd(error, res);
    else sendErrorProd(err, res);
  }
};

/////////////////////////////////////////////////////////////////
/*
function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'An error occurred' });
}
*/