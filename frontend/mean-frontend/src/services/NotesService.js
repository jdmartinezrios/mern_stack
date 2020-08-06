import axios from "axios";

export default class NotesServices {
  state = {
    url: "http://localhost:4000/api/notes",
  };

  getAllNotes() {
    return axios.get(this.state.url);
  }

  getNoteById(id) {
    return axios.get(`${this.state.url}/${id}`);
  }

  createNotes(note) {
    return axios.post(this.state.url, note);
  }

  editNotes(id, note) {
    return axios.put(`${this.state.url}/${id}`, note);
  }

  deleteNote(id) {
    return axios.delete(`${this.state.url}/${id}`);
  }
}
