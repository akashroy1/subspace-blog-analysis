require('dotenv').config({ path: './.env' });

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Routes
const blogRoutes = require('./routes/blogRoute');
const searchRoutes = require('./routes/searchRoute');
const AppError = require('./middleware/AppError');
const globalErrorHandler = require('./middleware/errorController');

app.get('/', (req, res) => {
    res.status(200).json({
      status: 'Success',
      msg: 'Welcome to Blog Anaysis, try visiting /api/blog-stats',
    });
});

app.use('/', blogRoutes);
app.use('/', searchRoutes);

app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    next(err);
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
