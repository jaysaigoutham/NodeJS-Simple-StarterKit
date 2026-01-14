const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

const blogCounter = (blogs) => {
  if (blogs.length == 0) return 0;
  if (blogs.length === 1) {
    return 1;
  }
  return 0;
};

const mostFavouriteBlog = (blogs) => {
  if (blogs.length == 0) return null;
  return blogs.reduce((max, blog) =>
    blog.likes > max.likes ? (max = blog) : max
  );
};

const likesCounter = (blogs) => {
  if (blogs.length == 0) return 0;

  return blogs.reduce((total, blog) => total + blog.likes || 0, 0);
};

const mostBlogsAuthor = (blogs) => {
  if (blogs.length == 0) return null;

  const countByAuthor = blogs.reduce((arrayofAuthors, blog) => {
    arrayofAuthors[blog.author] = (arrayofAuthors[blog.author] || 0) + 1;
    return arrayofAuthors;
  }, {});

  let maxAuthor = null;
  let maxBlogs = 0;

  for (const author in countByAuthor) {
    if (countByAuthor[author] > maxBlogs) {
      maxBlogs = countByAuthor[author];
      maxAuthor = author;
    }
  }

  return {
    author: maxAuthor,
    blogs: maxBlogs,
  };
};

const mostLikedBlog = (blogs) => {
  if (blogs.length == 0) return null;

  let maxLikeAuthor = null;
  let likes = 0;

  blogs.forEach(blog => {
    if(blog.likes > likes)
    {
      maxLikeAuthor = blog.author;
      likes = blog.likes;
    }
  });

  return {
    author: maxLikeAuthor,
    likes: likes
  };
};

module.exports = {
  reverse,
  average,
  blogCounter,
  likesCounter,
  mostFavouriteBlog,
  mostBlogsAuthor,
  mostLikedBlog
};
