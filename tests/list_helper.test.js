/**
 * Blog Helper Functions Unit Tests
 * Tests various utility functions for blog list operations
 */

const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("./testing_methods");

// Sample blog data for testing
const sampleBlogs = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Will Smith",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a674344d17f8",
    title: "Javascript is harmful for health",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 8,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d1wer",
    title: "Drink HTML codes in a glass",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

describe("Blog Unit Test", () => {
  // Test blog counting functionality
  test("Test Blog list counter", () => {
    const result = listHelper.blogCounter(sampleBlogs);
    assert.strictEqual(result, 0);
  });

  // Test total likes calculation
  test("Test Total likes counter", () => {
    const result = listHelper.likesCounter(sampleBlogs);
    assert.strictEqual(result, 23);
  });

  // Test finding most liked blog
  test("Most favourite blogs - with likes", () => {
    const result = listHelper.mostFavouriteBlog(sampleBlogs);
    assert.deepStrictEqual(result, sampleBlogs[0]);
  });

  // Test finding author with most blog posts
  test("Author with Most Blogs", () => {
    const result = listHelper.mostBlogsAuthor(sampleBlogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 2,
    });
  });

  // Test finding most liked blog author
  test('Most liked blog', () => {
    const result = listHelper.mostLikedBlog(sampleBlogs);
    assert.deepStrictEqual(result, {
      author: "Will Smith",
      likes: 10,
    })
  })

});
