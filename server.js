// database connection in mongoDB in node js

const express = require("express");
const app = express();
const db = require("./config/db");
const routes = require("./routes/index");
const bodyParser = require("body-parser");



app.use(bodyParser.json()); //req.body

app.get("/", function (req, res) {
  res.send(
    "welcome to my hotel .... how i can help you? we have list of menus"
  );
});

app.use("/api", routes);

//get routes to menu data

app.listen(3000,"0.0.0.0", () => {
  console.log("Listening on port 3000");
});
