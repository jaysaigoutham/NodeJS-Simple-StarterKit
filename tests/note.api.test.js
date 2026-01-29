/**
 * API Integration Tests for Notes
 * Tests the notes API endpoints using supertest
 */

const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./note.test_helper");
const Note = require('../models/note')
const api = supertest(app);
const User = require("../models/user");

describe("Note API Tests", () => {
  /**
   * Setup before each test
   * Clears the database and initializes it with test data
   */
  beforeEach(async () => {
    await Note.deleteMany({});
    console.log("cleared");

    //option 1 - Using promise
    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)

    //option 2- using mongoose buiilt in meathods
    //await Note.insertMany(helper.initialNotes)

    console.log("done")
  });

  /**
   * Test: POST /api/notes
   * Verifies that a new note can be successfully added to the database
   */
  test("a note can be added sucessfully", async () => {
    
    const newNote = {
      content: "async/await simplifies making async calls",
      important: true
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await helper.notesInDb();
    //assert.strictEqual(response, helper.initialNotes);

    const contents = response.map((n) => n.content);
    assert(contents.includes("async/await simplifies making async calls"));
  });

  /**
   * Test: GET /api/notes
   * Verifies that notes are returned in JSON format
   */
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/); // defined as Regex insted of String
  });

  /**
   * Test: GET /api/notes/:id
   * Verifies that a specific note can be viewed by its ID
   */
  test("a specific note can be viewed", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.deepStrictEqual(resultNote.body, noteToView);
  });

  /**
   * Test: GET /api/notes - count
   * Verifies that all notes are returned (checks count)
   */
  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  /**
   * Test: GET /api/notes - content check
   * Verifies that a specific note is within the returned notes
   */
  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((e) => e.content);
    console.log(contents);
    assert.strictEqual(contents.includes("Hello there"), true);
  });

  /**
   * Test: POST /api/notes - validation
   * Verifies that a note without content is rejected with 400 status
   */
  test("note without contnent is not added", async () => {
    const newNote = {
      important: true,
    };

    await api.post("/api/notes").send(newNote).expect(400);
    const notesAtEnd = await helper.notesInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
  });

  /**
   * Test: DELETE /api/notes/:id
   * Verifies that a note can be successfully deleted
   */
  test("a note can be deleted", async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

    const notesAtEnd = await helper.notesInDb();

    const ids = notesAtEnd.map((n) => n.id);
    assert(!ids.includes(noteToDelete.id));

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
  });

  /**
   * Cleanup after all tests
   * Closes the database connection
   */
  after(async () => {
    await mongoose.connection.close();
  });
});
