const express = require('express');
const { fetchBlogData } = require('../controller/blogController');
const { searchBlogs } = require('../controller/searchController');

const router = express.Router();

router.get('/api/blog-search', async (req, res) => {
  const query = req.query.query;
  const allBlogs = await fetchBlogData();

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required' });
  }

  const matchingBlogs = searchBlogs(allBlogs, query);

  res.json({ matchingBlogs });

});

module.exports = router;
