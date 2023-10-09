const express = require('express');
const { fetchBlogData } = require('../controller/blogController');
const { searchBlogs } = require('../controller/searchController');

const AppError = require('../middleware/AppError');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const query = req.query.query;
  if (!query) {
    const error = new AppError("Query parameter 'query' is required", 400);
    return next(error);
  }
  try{
    const token = req.header('admin-secret');
    const allBlogs = await fetchBlogData(token);
    const matchingBlogs = searchBlogs(allBlogs, query);
    res.json({ matchingBlogs });
  } catch(err){
    return next(err)
  }
});

module.exports = router;
