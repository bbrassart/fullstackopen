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

const generateAuthorStats = (blogs, prop) => {
  return blogs.reduce((list, blog) => {
    const { author } = blog;
    const entryIndex = list.findIndex(entry => entry.author === author);
    if (entryIndex >= 0) {
      prop !== 'blogs' ? list[entryIndex][prop] += blog[prop] : list[entryIndex][prop] += 1;
      return list;
    }
    const newAuthorObj = { author };
    prop !== 'blogs' ? newAuthorObj[prop] = blog[prop] : newAuthorObj[prop] = 1;
    list.push(newAuthorObj);
    return list;
  }, []);
};

const getMostRankedAuthor = (authorStats, sortBy) => {
  return authorStats.reduce((prev, current) => prev[sortBy] > current[sortBy] ? prev : current);
};

const mostBlogs = blogs => {
  if (!blogs.length) return null;
  return getMostRankedAuthor(generateAuthorStats(blogs, 'blogs'), 'blogs');
};

const mostLikes = blogs => {
  if (!blogs.length) return null;
  return getMostRankedAuthor(generateAuthorStats(blogs, 'likes'), 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
