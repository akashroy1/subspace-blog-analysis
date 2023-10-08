const express = require('express');
const _ = require('lodash');
const { fetchBlogData } = require('../controller/blogController');

const router = express.Router();

router.get('/api/blog-stats', async (req, res) => {
  try {
    const allBlogs = await fetchBlogData();
    
    const totalBlogs = allBlogs.length;
    const longestTitleBlog = _.maxBy(allBlogs, (blog) => blog.title.length);
    const privacyBlogs = _.filter(allBlogs, (blog) => _.includes(_.toLower(blog.title), 'privacy'));
    const uniqueTitles = _.uniqBy(allBlogs, 'title');

    res.json({
        totalBlogs,
        longestTitle: longestTitleBlog.title,
        privacyTitleCount: privacyBlogs.length,
        uniqueTitles: uniqueTitles.map((blog) => blog.title),
    });

  } catch (error) {
    console.error('Error in blog-stats route:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;