const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
});

server.get("/", (req, res) => {
  res.render("courses");
});

server.get("/about", (req, res) => {
  res.render("about");
});

server.get("/", (req, res) => {
  res.send("Hi");
});

server.listen(5000, () => {
  console.log("Server is running - port 5000");
});
