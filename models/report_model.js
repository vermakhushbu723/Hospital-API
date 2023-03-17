// const mongoose = require("mongoose");
// const reportsSchema = new mongoose.Schema(
//   {
//     patient: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Report",
//     },
//     createdBy: {
//       type: moongose.Schema.Types.ObjectId,
//       ref: "Doctor",
//     },
//     patient_id: {
//       type: moongose.Schema.Types.ObjectId,
//     },
//     statusCode: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//     Date: {
//       type: Date,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Report = mongoose.model("Report", reportsSchema);
// module.exports = Report;
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);