const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: "Understanding MongoDB Basics",
    author: "John Doe",
    url: "https://example.com/mongodb-basics",
    likes: 15
  },
  {
    title: "Node.js Performance Tips",
    author: "Sarah Lee",
    url: "https://example.com/node-performance",
    likes: 32
  },
  {
    title: "Building REST APIs with Express",
    author: "Michael Tan",
    url: "https://example.com/express-rest-api",
    likes: 8
  }
]

/**
 * Generates a non-existing ID by creating and deleting a blog
 * @returns {Promise<string>} A valid MongoDB ID that doesn't exist in the database
 */
const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

/**
 * Retrieves all blogs from the database in JSON format
 * @returns {Promise<Array>} Array of blog objects from the database
 */
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

/**
 * Retrieves all users from the database in JSON format
 * @returns {Promise<Array>} Array of user objects from the database
 */
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
}
