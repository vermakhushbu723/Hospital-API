const mongoose = require("mongoose");
const doctorsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // confirmPassword: {
    //   type: String,
    //   required: true,
    // },
  },

  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", doctorsSchema);
module.exports = Doctor;