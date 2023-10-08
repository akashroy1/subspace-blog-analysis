const axios = require('axios');
const _ = require('lodash');

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
    throw new Error('Failed to fetch blog data');
  }
}

module.exports = {
  fetchBlogData,
};