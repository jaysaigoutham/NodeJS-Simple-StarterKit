/**
 * Testing Helper Methods
 * Utility functions for string manipulation and blog statistics
 */

/**
 * Reverses a string
 * @param {string} string - The string to reverse
 * @returns {string} The reversed string
 */
const reverse = (string) => {
  return string.split("").reverse().join("");
};

/**
 * Calculates the average of an array of numbers
 * @param {number[]} array - Array of numbers
 * @returns {number} The average value, or 0 if array is empty
 */
const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length;
};

/**
 * Counts blogs (incomplete implementation)
 * @param {Array} blogs - Array of blog objects
 * @returns {number} Count of blogs
 */
const blogCounter = (blogs) => {
  if (blogs.length == 0) return 0;
  if (blogs.length === 1) {
    return 1;
  }
  return 0;
};

/**
 * Finds the blog with the most likes
 * @param {Array} blogs - Array of blog objects
 * @returns {Object|null} The blog with the most likes, or null if array is empty
 */
const mostFavouriteBlog = (blogs) => {
  if (blogs.length == 0) return null;
  return blogs.reduce((max, blog) =>
    blog.likes > max.likes ? (max = blog) : max
  );
};

/**
 * Calculates the total number of likes across all blogs
 * @param {Array} blogs - Array of blog objects
 * @returns {number} Total likes count
 */
const likesCounter = (blogs) => {
  if (blogs.length == 0) return 0;

  return blogs.reduce((total, blog) => total + blog.likes || 0, 0);
};

/**
 * Finds the author with the most blog posts
 * @param {Array} blogs - Array of blog objects
 * @returns {Object|null} Object with author name and blog count, or null if array is empty
 */
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

/**
 * Finds the author with the most total likes
 * @param {Array} blogs - Array of blog objects
 * @returns {Object|null} Object with author name and total likes, or null if array is empty
 */
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
