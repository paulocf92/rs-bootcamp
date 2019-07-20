// imports express
const express = require("express");

// fires up an express server
const server = express();

// catches incoming requests on route '/test'
server.get("/test", (req, res) => {
  // returns json object containing a string
  return res.json({ message: "Hello World" });
});

// listens to requests on port 3000
server.listen(3000);
