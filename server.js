const express = require("express");
require("dotenv").config();

const app = express();
const routes = require("./routes/index");
require("./config/db");

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("welcome to my hotel .... how i can help you? we have list of menus ..");
});

// API routes
app.use("/api", routes);

const PORT = process.env.PORT || 3000
console.log(PORT)
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});
