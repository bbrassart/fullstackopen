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
