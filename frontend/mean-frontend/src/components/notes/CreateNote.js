import React, { Component } from "react";
import NotesServices from "../../services/NotesService";
import UsersService from "../../services/UsersService ";
import Datepicker from "react-datepicker";

export default class CreateNote extends Component {
  state = {
    notesService: new NotesServices(),
    usersService: new UsersService(),
    notes: [],
    users: [],
    userSelected: "",
    content: "",
    title: "",
    date: new Date(),
    editing: false,
    _id: "",
  };

  componentDidMount() {
    const params = this.props.match.params;
    this.getAllUsers();
    this.getAllNotes();
    if (params.id) {
      this.getNotesById(params.id);
    }
  }

  getNotesById = (id) => {
    this.state.notesService
      .getNoteById(id)
      .then((res) => {
        console.log(res);
        const note = res.data.body;
        this.setState({
          editing: true,
          _id: note._id,
          userSelected: note.author,
          content: note.content,
          title: note.title,
          date: new Date(note.date),
        });
      })
      .catch((err) => console.error(err));
  };

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

  getAllUsers = () => {
    this.state.usersService
      .getAllUsers()
      .then((res) =>
        this.setState({
          users: res.data.body,
          userSelected: res.data.body[0].username,
        })
      )
      .catch((err) => console.error(err));
  };

  createNote = (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected,
    };
    if (this.state.editing) {
      this.state.notesService
        .editNotes(this.state._id, newNote)
        .then((res) => {
          console.log(res);
          window.location.href = "/listNotes";
        })
        .catch((err) => console.error(err));
    } else {
      this.state.notesService
        .createNotes(newNote)
        .then((res) => {
          console.log(res);
          window.location.href = "/listNotes";
        })
        .catch((err) => console.error(err));
    }
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDate = (date) => {
    console.log(date);
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a note</h4>

          <div className="form-group">
            <select
              name="userSelected"
              id="userSelected"
              className="form-control"
              value={this.state.userSelected}
              onChange={this.onInputChange}
            >
              {this.state.users.map((user) => (
                <option value={user.username} key={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Title"
              onChange={this.onInputChange}
              value={this.state.title}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="content"
              id="content"
              cols="5"
              rows="5"
              className="form-control"
              placeholder="Content"
              onChange={this.onInputChange}
              value={this.state.content}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <Datepicker
              className="form-control w-100"
              selected={this.state.date}
              onChange={this.onChangeDate}
              value={this.state.date}
            ></Datepicker>
          </div>

          <form onSubmit={this.createNote}>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
