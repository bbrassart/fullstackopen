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
  describe('when incoming blogpost is valid', () => {
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
      expect(authors).toContain('Jean Marc');
    });

    describe('if incoming blogpost body DOES contain a likes property', () => {
      test('it sets likes field based on the body definition', async () => {
        const newBlog = {
          title: 'foo',
          author: 'bar',
          likes: 123,
          url: 'https://foo.bar'
        };

        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const newBlogInDb = response.body.find(blog => blog.title === newBlog.title);
        expect(newBlogInDb.likes).toBe(123);
      });
    });

    describe('if incoming blogpost body does not contain any likes property', () => {
      test('it sets likes property to its default value, 0', async () => {
        const newBlogWithoutLikes = {
          title: 'baz',
          author: 'lorem',
          url: 'https://lorem.ipsum'
        };

        await api
          .post('/api/blogs')
          .send(newBlogWithoutLikes)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        const newBlogInDb = response.body.find(blog => blog.title === newBlogWithoutLikes.title);
        expect(newBlogInDb.likes).toBe(0);
      });
    });
  });

  describe('when incoming blogpost has a validation issue', () => {
    test('it returns a 400 when there is no valid title', async () => {
      const newBlog = {
        author: 'Jean Marc',
        url: 'https://lemonde.fr',
        likes: 78
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect({"error": "Blog validation failed: title: Path `title` is required."});

      const response = await api.get('/api/blogs');
      const authors = response.body.map(r => r.author);

      expect(response.body.length).toBe(helper.initialBlogs.length);
      expect(authors).not.toContain('Jean Marc');
    });

    test('it returns a 400 when there is no valid url', async () => {
      const newBlog = {
        title: 'Le Monde',
        author: 'Jean Marc',
        likes: 78
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect({"error": "Blog validation failed: url: Path `url` is required."});

      const response = await api.get('/api/blogs');
      const authors = response.body.map(r => r.author);

      expect(response.body.length).toBe(helper.initialBlogs.length);
      expect(authors).not.toContain('Jean Marc');
    });
  });
});

afterAll(() => {
  mongoose.connection.close()
});
