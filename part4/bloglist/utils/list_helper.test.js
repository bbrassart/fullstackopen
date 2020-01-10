const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('#totalLikes', () => {
  test('of empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog equals the total of that', () => {
    const blogs = [
      { likes: 8 }
    ];

    expect(listHelper.totalLikes(blogs)).toBe(blogs[0].likes);
  });

  test('of a bigger list is calculated right', () => {
    const blogs = [
      { likes: 6 }, { likes: 9 }, { likes: 3 }, { likes: 5 }
    ];

    expect(listHelper.totalLikes(blogs)).toBe(23);
  });
});

describe('#favoriteBlog', () => {
  test('of empty list returns null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null);
  });

  test('when list has only one blog returns the properties of that blog', () => {
    const singleBlogpost = {
      likes: 4,
      author: 'foo',
      title: 'bar'
    };

    const blogs = [ singleBlogpost ];
    expect(listHelper.favoriteBlog(blogs)).toEqual(singleBlogpost);
  });

  test('of a bigger list returns the properties of the most liked blogpost', () => {
    const firstBlogpost = {
      likes: 4,
      author: 'foo',
      title: 'bar'
    };

    const secondBlogpost = {
      likes: 98,
      author: 'Matt',
      title: 'Maggie'
    };

    const thirdBlogpost = {
      likes: 9,
      author: 'Matt',
      title: 'Bart'
    };

    const blogs = [ firstBlogpost, secondBlogpost, thirdBlogpost ];
    expect(listHelper.favoriteBlog(blogs)).toEqual(secondBlogpost);
  });
});

describe('#mostBlogs', () => {
  test('of empty list is 0', () => {
    expect(listHelper.mostBlogs([])).toBe(null);
  });

  test('of a bigger list returns most prolific author and its number of publications', () => {
    const blogs = [
      { author: 'Albert' },
      { author: 'Robert C. Martin' },
      { author: 'Robert C. Martin' },
      { author: 'Diego' }
    ];

    const expectedResult = { author: 'Robert C. Martin', blogs: 2 };
    expect(listHelper.mostBlogs(blogs)).toEqual(expectedResult);
  });
});


