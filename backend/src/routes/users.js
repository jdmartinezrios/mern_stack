const express = require('express');
const users = express.Router();
const userController = require("../controllers/users");

// users
users.post("/users", userController.createUser);
users.put("/users/:id", userController.updateUser);
users.delete("/users/:id", userController.delete);
users.get("/users", userController.getUser);
users.get("/users/:id", userController.getUserById);

module.exports = users;