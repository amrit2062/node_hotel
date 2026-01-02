const mongoose = require("mongoose");

// Define the MongoDB  connection URL
const mongoURL = "mongodb://localhost:27017/hotel"; // replace "mydatabase" with your database name

// setup MongoDB connection
mongoose.connect(mongoURL);
// get the default connection
// mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;
db.on("connected", () => {
  console.log("connected to MongoDb  server");
});

db.on("error", (err) => {
  console.log("MongoDB  connection error:", err);
});
db.on("disconnected", () => {
  console.log("MongoDb disconnected");
});

// exports the database connection
module.exports = db;
