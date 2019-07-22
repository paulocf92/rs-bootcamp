// imports express
const express = require("express");

// fires up an express server
const server = express();

// query params = ?test=1
// route params = /test/1
// body params = { "name": "Joseph" }

const users = ["Paulo", "Joseph", "Maria"];

// catches incoming requests on route '/test'
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

// listens to requests on port 3000
server.listen(3000);
