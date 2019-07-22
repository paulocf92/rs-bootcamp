// imports express
const express = require("express");

// fires up an express server
const server = express();

// query params = ?test=1
// route params = /test/1
// body params = { "name": "Joseph" }

// catches incoming requests on route '/test'
server.get("/users/:id", (req, res) => {
  const id = req.params.id;

  return res.json({ message: `Searching for user ${id}...` });
});

// listens to requests on port 3000
server.listen(3000);
