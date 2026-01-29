/**
 * Note Model - Mongoose schema for Note documents
 * Defines the structure and validation rules for notes in the database
 */

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Define note schema with validation
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5 // Content must be at least 5 characters
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Transform the returned object to use 'id' instead of '_id'
// and remove MongoDB specific fields
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)