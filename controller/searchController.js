const _ = require('lodash');

const searchBlogs = _.memoize((blogData, query) => {
  const queryLowerCase = query.toLowerCase();
  return _.filter(blogData, (blog) => _.includes(_.toLower(blog.title), queryLowerCase));
});

module.exports = {
  searchBlogs,
};
