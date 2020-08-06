import React, { Component } from "react";
import UsersService from "../../services/UsersService ";

export default class CreateUser extends Component {
  state = {
    usersService: new UsersService(),
    username: "",
    users: [],
  };

  componentDidMount() {
    this.onGetAllUsers();
  }

  onGetAllUsers() {
    this.state.usersService
      .getAllUsers()
      .then((res) => {
        this.setState({ users: res.data.body });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onSubmited = (e) => {
    e.preventDefault();
    this.state.usersService
      .createUser(this.state.username)
      .then((res) => {
        console.log(res);
        this.resetForm();
        this.onGetAllUsers();
      })
      .catch((err) => console.error(err));
  };

  deleteUsers = (id) => {
    console.log(id);
    this.state.usersService
      .deleteUsers(id)
      .then((res) => {
        console.log(res.data);
        this.onGetAllUsers();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  resetForm() {
    this.setState({ username: "" });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create new user</h3>
            <form onSubmit={this.onSubmited}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="text"
                  value={this.state.username}
                  className="form-control"
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li
                key={user._id}
                className="list-group-item list-group-item-action"
              >
                {user.username}
                <button
                  type="button"
                  className="btn btn-danger float-right"
                  onClick={() => this.deleteUsers(user._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
