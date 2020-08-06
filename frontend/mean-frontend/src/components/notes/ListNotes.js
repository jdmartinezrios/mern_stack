import React, { Component } from "react";
import NotesServices from "../../services/NotesService";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class ListNotes extends Component {
  state = {
    notesService: new NotesServices(),
    notes: [],
  };

  componentDidMount() {
    this.getAllNotes();
  }

  getAllNotes = () => {
    this.state.notesService
      .getAllNotes()
      .then((res) => {
        this.setState({ notes: res.data.body });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteNotes = (id) => {
    console.log(id);
    this.state.notesService
      .deleteNote(id)
      .then((res) => {
        console.log(res);
        this.getAllNotes();
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="row">
        {this.state.notes.map((note) => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5 className="m-0">{note.title}</h5>
                <Link className="btn btn-warning" to={"/editNotes/" + note._id}>
                  Edit
                </Link>
              </div>
              <div className="card-body">
                <p>{note.content}</p>
                <p>{note.author}</p>
              </div>
              <div className="card-footer">
                <p className="float-left">{format(note.date)}</p>
                <button
                  type="button"
                  className="btn btn-danger float-right"
                  onClick={() => this.deleteNotes(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
