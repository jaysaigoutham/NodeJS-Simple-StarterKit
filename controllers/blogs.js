/**
 * Blogs Router - Handles all /api/blogs endpoints
 * Provides CRUD operations for Blog resources
 */

const blogsRouter = require("express").Router();
const { request, response } = require("../app");
const blog = require("../models/blog");
const Blog = require("../models/blog");

/**
 * GET /api/blogs
 * Retrieves all blogs from the database
 */
blogsRouter.get("/", async (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

/**
 * POST /api/blogs
 * Creates a new blog post
 * Request body should contain: title, author, url, likes
 */
blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", async (request, response, next) => {
  
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { likes, author } = request.body;

  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).end();
      }

      blog.likes = likes;
      blog.author = author;

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog);
      });
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
