const axios = require('axios');
const AppError = require('../middleware/AppError');

async function fetchBlogData() {
  try {
    const apiUrl = process.env.BACKEND_URL;
    const response = await axios.get(apiUrl, {
      headers: {
        'x-hasura-admin-secret': process.env.ADMIN_SECRET,
      },
    });

    const blogData = response.data;
    const allBlogs = blogData.blogs;

    return allBlogs;

  } catch (error) {
    throw new AppError('Failed to fetch blog data', 500);
  }
}

module.exports = {
  fetchBlogData,
};
