const express = require("express");
require("dotenv").config();

const app = express();
const routes = require("./routes/index");
require("./config/db");

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("welcome to my  amrit hotels  pay last ");
});

// API routes
app.use("/api", routes);

// // middleware function 
//  const logRequest = (req, res, next)=>{
//   console.log(`[${new Date().toLocaleDateString()}]Request Made to : ${req.originalUrl}`);
//   next(); // move on to the next phase
//  }
//  app.use(logRequest);
//  app.get('/',function (req,res){
//   res.send("welcome to our hotel")
//  })



const PORT = process.env.PORT || 3000
console.log(PORT)
app.listen(PORT, "0.0.0.0", () => {
  console.log(` Server running on port ${PORT}`);
});
