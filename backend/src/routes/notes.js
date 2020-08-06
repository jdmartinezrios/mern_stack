const express = require('express');
const notes = express.Router();
const notesController = require("../controllers/notes");

// notes
notes.post("/notes", notesController.createNote);
notes.put("/notes/:id", notesController.updateNotes);
notes.delete("/notes/:id", notesController.deleteNote);
notes.get("/notes", notesController.getNotes);
notes.get("/notes/:id", notesController.getNoteById);

module.exports = notes;