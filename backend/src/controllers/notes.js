const Note = require("../models/Note");
const notesController = {};

notesController.createNote = async (req, res) => {
  const note = req.body;
  const newNote = new Note({
    title: note.title,
    content: note.content,
    author: note.author,
    date: note.date,
  });
  await newNote.save();
  console.log("Saved note");
  res.status(200).json({ message: "ok", body: newNote });
};

notesController.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ message: "ok", body: notes });
};

notesController.getNoteById = async (req, res) => {
  const id = req.params.id;
  const note = await Note.findOne({ _id: id });
  res.status(200).json({ message: "ok", body: note });
};

notesController.updateNotes = async (req, res) => {
  const { id } = req.params;
  const note = req.body;
  try {
    const newNote = await Note.findOneAndUpdate(
      { _id: id },
      {
        title: note.title,
        content: note.content,
        author: note.author,
        date: note.date,
      }
    );
    res.status(200).json({ message: "ok", body: newNote });
  } catch (e) {
    res.status(400).json({ message: "error", exception: e });
  }
};

notesController.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const noteDelete = await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "ok", body: noteDelete });
  } catch (e) {
    res.status(400).json({ message: "error", exception: e });
  }
};

module.exports = notesController;
