const dummy = blogs => 1;

const totalLikes = blogs => {
  return blogs.reduce((a, b) => {
    return a + b.likes
  }, 0);
};

const favoriteBlog = blogs => {
  if (!blogs.length) return null;
  const { author, title, likes } =
    blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
  return { author, title, likes };
};

const mostBlogs = blogs => {
  if (!blogs.length) return null;
  const authorStats =  blogs.reduce((list, blog) => {
    const entryIndex = list.findIndex(entry => entry.author === blog.author);
    entryIndex >= 0 ? list[entryIndex].blogs += 1 : list.push({author: blog.author, blogs: 1});
    return list;
  }, []);

  return authorStats.reduce((prev, current) => prev.blogs > current.blogs ? prev : current);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
