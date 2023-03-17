const Patient = require("../../models/patient_model");
const Report = require("../../models/report_model");

//List of available status
//Every status is assigned a number (status code) corresponding to the index of the following array
//For example, status code '0' corresponds to 'Negative status, status code '1' corresponds to 'Travelled - Quarantine', and so on
const statusCodeList = [
  "Negative",
  "Travelled - Quarantine",
  "Symptoms - Quarantine",
  "Positive - Admit",
];

//Register a new patient
//This is a protected route,i.e., only a logged in doctor can register a new patient
module.exports.register = async function (req, res) {
  try {
    //check if the patient already exists or not
    const patient = await Patient.findOne({ phone: req.body.phone });
    //if patient found then it means he is already registerd sojust return the data of patient
    if (patient) {
      return res.status(200).json({
        status: "success",
        message: "Patient already registered",
        data: {
          id: patient._id,
          name: patient.name,
          phone: patient.phone,
          createdBy: req.user.name,
        },
      });
    }
    //if the patient doesn't exist, register the patient
    const newPatient = await Patient.create({
      phone: req.body.phone,
      name: req.body.name,
      createdBy: req.user.id, //Store the logged in doctor who registered the patient
    });

    //Return information of the newly registered patient
    return res.status(201).json({
      status: "Success",
      message: "New Patient registered succesfully",
      data: {
        id: newPatient._id,
        name: newPatient.name,
        phone: newPatient.phone,
        createdBy: req.user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

//create a report for a patient
//This is a protected route,i.e., only a logged in doctor can perform this task

module.exports.createReport = async function (req, res) {
  try {
    //use patient's id to check if patient is registered

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(400).json({
        status: "Failure",
        message: "Patient not registered",
      });
    }

    //if patient is registered, check if status code is valid
    var s = req.body.statusCode;

    if (!(s == 0 || s == 1 || s == 2 || s == 3)) {
      return res.status(400).json({
        status: "Failure",
        message: "Invalid status code",
      });
    }

    //if patient is registered and status code is valid, create report
    const report = await Report.create({
      status: statusCodeList[req.body.status],
      createdBy: req.user.id, //stores the Doctor object
      patient: patient.id, //stores the Patient object
    });
    console.log("report", report);

    patient.reports.push(report.id);
    patient.save();

    return res.status(201).json({
      status: "Success",
      message: "New report created",
      data: {
        report: report,
        patient: patient,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err });
  }
};

//get all the reports of a patient
//this route is unprotected, i.e, it can be accessed by anyone without authentication

module.exports.allReports = async function (req, res) {
  try {
    //use patient's phone to check if patient is registered
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(400).json({
        status: "Failure",
        message: "Patient not registered",
      });
    }

    //fetch all the reports of a patient, sort the reports chronologically and populate the doctor object
    let reports = await Report.find(
      { patient: patient._id },
      "status createdAt createdBy -_id"
    )
      .sort("createdAt")
      .populate("createdBy", "name -_id");

    return res.status(200).json({
      message: "All Reports",
      data: {
        patient: patient,
        reports: reports,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
};