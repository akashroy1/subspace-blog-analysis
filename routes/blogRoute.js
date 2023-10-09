const express = require('express');
const _ = require('lodash');
const { fetchBlogData } = require('../controller/blogController');

const router = express.Router();

const calculateAnalysis = _.memoize((allBlogs)=>{
  const totalBlogs = allBlogs.length;
  const longestTitleBlog = _.maxBy(allBlogs, (blog) => blog.title.length);
  const privacyBlogs = _.filter(allBlogs, (blog) => _.includes(_.toLower(blog.title), 'privacy'));
  const uniqueTitles = _.uniqBy(allBlogs, 'title');

  return {
    totalBlogs,
    longestTitle: longestTitleBlog.title,
    privacyTitleCount: privacyBlogs.length,
    uniqueTitles: uniqueTitles.map((blog) => blog.title)
  };
})

router.get('/', async (req, res, next) => {
  try {
    const token = req.header('admin-secret');
    const allBlogs = await fetchBlogData(token);
    
    const analysis = calculateAnalysis(allBlogs);
    

    res.json( analysis );

  } catch (error) {
    return next(error);
  }
});

module.exports = router;
