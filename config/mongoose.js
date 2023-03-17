// getting-started.js
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// we're connected!
// });

const mongoose = require("mongoose");

//mongoose.connect("mongodb://localhost/hospital");

mongoose.connect('mongodb://localhost/hospital', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log("khushbu",err));

const db = mongoose.connection;

//db.on("error", console.error.bind(console, "Error connecting to Mongodb"));

//db.once("open", function () {
 // console.log("Connected to database :: MongoDB");
//});

module.exports = db;