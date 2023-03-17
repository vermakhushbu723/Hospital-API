require("dotenv").config();
const express = require("express");
const port = process.env.PORT||8000;

const app = express();

//const db = require("./config/mongoose");


const mongoose = require("mongoose");
const passport = require("passport");
const passportJWT = require("./config/passport_jwt_strategy");

mongoose.connect(process.env.MONGO, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


//Middlewares
app.use(express.urlencoded());

app.use("/", require("./routes/api"));

//listening to server

app.listen(port, function (err) {
  if (err) {
    console.log("error in running the server");
    return;
  }
  console.log("server is up and running on port:", port);
  return;
});