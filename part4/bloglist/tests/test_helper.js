const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Surfers Journal',
    url: 'https://www.surfersjournal.com',
    likes: 123,
    author: 'Bart'
  },
  {
    title: 'Thrasher',
    url: 'https://www.thrashermagazine.com',
    likes: 0,
    author: 'Fausto'
  }
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs, blogsInDb
};
