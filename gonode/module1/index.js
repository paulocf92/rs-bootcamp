// imports express
const express = require("express");

// fires up an express server
const server = express();

// enables express to accept json through POST
server.use(express.json());

// query params = ?test=1
// route params = /test/1
// body params = { "name": "Joseph" }

// CRUD - Create, Read, Update, Delete

const users = ["Paulo", "Joseph", "Maria"];

// lists all users
server.get("/users", (req, res) => {
  return res.json(users);
});

// lists a single user
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

// creates a single user
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// updates a single user
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// deletes a single user
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

// listens to requests on port 3000
server.listen(3000);
