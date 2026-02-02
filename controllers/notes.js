/**
 * Notes Router - Handles all /api/notes endpoints
 * Provides CRUD operations for Note resources
 */

const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if(authorization && authorization.startsWith('Bearer '))
  {
    return authorization.replace('Bearer', '');
  }
  return this.all;
}


/**
 * GET /api/notes
 * Retrieves all notes from the database
 */
notesRouter.get("/", async (request, response, next) => {

  /*Note.find({}).then(notes => {
    response.json(notes)
  })*/

  const notes = await Note.find({});
  response.json(notes);
});

/**
 * GET /api/notes/:id
 * Retrieves a single note by its ID
 */
notesRouter.get("/:id", async (request, response, next) => {

  /*Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));*/

  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

/**
 * POST /api/notes
 * Creates a new note
 * Request body should contain: content (required), important (optional)
 */
notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }


  //const user = await User.findById(body.userID);

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user : user._id
  });

  

  /*note
    .save()
    .then((savedNote) => {
      response.status(201).json(savedNote);
    })
    .catch((error) => next(error));*/

  const savedNote = await note.save();
  user.notes = user.notes.concat(user._id);
  await user.save()
  response.status(201).json(savedNote);
});


/**
 * DELETE /api/notes/:id
 * Deletes a note by its ID
 */
notesRouter.delete("/:id", async (request, response, next) => {
  /*Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));*/

  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

/**
 * PUT /api/notes/:id
 * Updates an existing note
 * Request body should contain: content, important
 */
notesRouter.put("/:id", async (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
