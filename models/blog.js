/**
 * Blog Model - Mongoose schema for Blog documents
 * Defines the structure and validation rules for blog posts in the database
 */

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Define blog schema with validation
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5 // Title must be at least 5 characters
  },
  author: {
    type: String,
    required: true,
    minlength: 5 // Author name must be at least 5 characters
  },
  url: {
    type: String,
    required: true,
    minlength: 1 // URL must not be empty
  },
  likes: {
    type: Number,
    required: false,
    default: 0,
    minlength: 1 // Likes count is required
  },
})

// Transform the returned object to use 'id' instead of '_id'
// and remove MongoDB specific fields
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)