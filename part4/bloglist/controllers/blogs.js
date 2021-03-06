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
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blog = { title, author, url, likes };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog.toJSON());
  } catch(exception) {
    next(exception)
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
