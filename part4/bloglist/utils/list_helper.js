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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
