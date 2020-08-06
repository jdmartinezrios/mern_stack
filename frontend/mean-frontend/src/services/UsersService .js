import axios from "axios";

export default class UsersService {
  state = {
    url: "http://localhost:4000/api/users",
  };

  getAllUsers() {
    return axios.get(this.state.url);
  }

  createUser(username) {
    return axios.post(this.state.url, {
      username: username,
    });
  }

  deleteUsers(id) {
    return axios.delete(`${this.state.url}/${id}`);
  }
}
