const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = helper.initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogs.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('#get', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initialBlogs.length)
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('each and every blog contains a single id property, no more __id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0].__id).not.toBeDefined();
  });
});

describe('#post', () => {
  test('a valid blogpost can be added ', async () => {
    const newBlog = {
      title: 'Le Monde',
      author: 'Jean Marc',
      url: 'https://lemonde.fr',
      likes: 78
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    const authors = response.body.map(r => r.author);

    expect(response.body.length).toBe(helper.initialBlogs.length + 1);
    expect(authors).toContain(
      'Jean Marc'
    );
  });
});

afterAll(() => {
  mongoose.connection.close()
});
