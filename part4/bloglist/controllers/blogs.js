const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes = 0 } = request.body;
  const blog = new Blog({ title, author, url, likes });

  try {
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  } catch(exception) {
    next(exception)
  }}
);

module.exports = blogsRouter;
