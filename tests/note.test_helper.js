/**
 * Test Helper Functions
 * Provides utility functions and test data for API testing
 */

const Note = require('../models/note')

// Initial test data for notes
const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
  {
    content: 'Hello there',
    important: true,
  },
]

/**
 * Generates a non-existing ID by creating and deleting a note
 * @returns {Promise<string>} A valid MongoDB ID that doesn't exist in the database
 */
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

/**
 * Retrieves all notes from the database in JSON format
 * @returns {Promise<Array>} Array of note objects from the database
 */
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb
}

