const _ = require('lodash');

function searchBlogs(blogData, query) {
  const queryLowerCase = query.toLowerCase();
  return _.filter(blogData, (blog) => _.includes(_.toLower(blog.title), queryLowerCase));
}

module.exports = {
  searchBlogs,
};
