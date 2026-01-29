const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./blog.test_helper");

describe("Blog related methods", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    console.log("cleared");
  });

  test("List all blogs available", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("a Blog is added suncessfully", async () => {
    const newBlog = {
      title: "Sample blog",
      author: "Bruce Wayne",
      url: "https://cloud.mongodb.com/",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await helper.blogsInDb();
    const contents = response.map((b) => b.Blog);
    const exists = contents.some((content) => {
      try {
        assert.deepStrictEqual(content, newBlog);
        return true;
      } catch {
        return false;
      }
    });

    assert.strict(exists, true);
  });

  test("Like missing", async () => {
    const newBlog = {
      title: "Sample blog without like",
      author: "Bruce Wayne",
      url: "https://cloud.mongodb.com/",
    };

    const apiResponse = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await helper.blogsInDb();
    console.log(response);
    const blog = response.filter((blog) => blog.title === newBlog.title).at(0);
    console.log(blog);

    assert.strictEqual(apiResponse.body.likes, 0);
  });

  test("Blog without title", async () => {
    const newBlog = {
      author: "Bruce Wayne",
      url: "https://cloud.mongodb.com/",
      likes: 1,
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.statusCode, 400);
  });

  test("Blog is deleted", async () => {

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const ids = blogsAtEnd.map((n) => n.id);
    assert(!ids.includes(blogsAtEnd.id));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });

  /**
   * Cleanup after all tests
   * Closes the database connection
   */
  after(async () => {
    await mongoose.connection.close();
  });
});
