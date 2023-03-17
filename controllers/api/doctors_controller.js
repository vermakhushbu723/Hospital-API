const Doctor = require("../../models/doctor_model");
const jwt = require("jsonwebtoken");

//Register a doctor
module.exports.register = async function (req, res) {
  try {
    //check if email already exists

    console.log("req", req.body);
    const emailExists = await Doctor.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).send({
        status: "Failure",
        message: "Email already exists",
      });
    }

    //check if username exists
    const usernameExists = await Doctor.findOne({
      userName: req.body.userName,
    });
    if (usernameExists) {
      return res.status(400).send({
        status: "Failure",
        message: "Username already exists",
      });
    }

    //if email and username are unique, register new user (doctor)

    //create new user
    const user = await Doctor.create({
      email: req.body.email,
      name: req.body.name,
      userName: req.body.userName,
      password: req.body.password,
      // confirmPassword: req.body.confirmPassword,
    });

    //return the info of the newly created user as json

    return res.status(201).send({
      status: "Success",
      message: "User registered",
      data: {
        email: user.email,
        name: user.name,
        userName: user.userName,
      },
    });
  } catch (err) {
    console.log("error in registering ", err);
    res.status(400).send({ message: "error in registering", err });
  }
};

//Login a registered doctor using passport jwt authentication
module.exports.login = async function (req, res) {
  try {
    //check if user exists (using username)
    const user = await Doctor.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    //create and assign a token, and return the JWT as json
    const token = jwt.sign(user.toJSON(), "secret-khus");
    res.status(200).json({
      status: "Success",
      JWT_token: token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};