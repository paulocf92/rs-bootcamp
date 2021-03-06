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

// middleware example; intercepts a request and do something
server.use((req, res, next) => {
  // displaying method and url for this request
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  // next ensures this middleware won't interrupt the request flow
  return next();
});

// local middleware example
function checkUserExists(req, res, next) {
  // if name parameter isn't found on request body, throw bad request error
  // with custom message
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  // otherwise, proceed with request flow
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User does not exist" });
  }

  // if passed validation, add another var to the request containing user
  // this var can be used by subsequent middlewares or routes
  req.user = user;

  return next();
}

// lists all users
server.get("/users", (req, res) => {
  return res.json(users);
});

// lists a single user
server.get("/users/:index", checkUserInArray, (req, res) => {
  // return user directly from request, added in checkUserInArray middleware
  return res.json(req.user);
});

// creates a single user
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// updates a single user
server.put("/users/:index", checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// deletes a single user
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
});

// listens to requests on port 3000
server.listen(3000);
