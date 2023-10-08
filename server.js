require('dotenv').config({ path: './.env' });

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Routes
const blogRoutes = require('./routes/blogRoute');
const searchRoutes = require('./routes/searchRoute');
const errorHandler = require('./middleware/errorController');

app.get('/', (req, res) => {
    res.status(200).json({
      status: 'Success',
      msg: 'Welcome to Blog Anaysis, try visiting /api/blog-stats',
    });
});

app.use('/', blogRoutes);
app.use('/', searchRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
