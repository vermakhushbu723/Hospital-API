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

module.exports.reports = async function (req, res) {
  try {
    let report = await Report.find(
      { statusCode: req.params.status },
      "createdAt -_id"
    )
      .populate("createdBy", "name -_id")
      .populate("patient", "name phone -_id");

    var s = req.params.status;

    if (!(s == 0 || s == 1 || s == 2 || s == 3)) {
      return res.status(400).json({
        status: "Failure",
        message: "Invalid status code",
      });
    }

    return res.status(200).json({
      status: "Success",
      report_status: statusCodeList[req.params.status],
      data: report,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};