const employee = require("../models/employee");

exports.createemployee = async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains the employee data

    // create the new employee to the database
    console.log(data);
    const newemployee = new employee(data);

    //save the new employee to the databases
    const response = await newemployee.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.getemployee = async (req, res) => {
  try {
    const data = await employee.find().limit();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.getemployeeWorktype = async (req, res) => {
  // const workType = req.params.workType; // extract the work type from url parameter
  // if (worktype == "chef" || workType == "manger" || worktype == "waiter") {
  // }
  try {
    const workType = req.params.workType; // extract the work type from url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await employee.find({ work: workType }).limit();
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server error" });
  }
};
exports.updateemployee = async (req, res) => {
  try {
    const employeeId = req.params.id; //extract the id  from the URL  parameter
    const updatedemployeeDate = req.body; // updated data for the employee

    const response = await employee.findByIdAndUpdate(
      employeeId,
      updatedemployeeDate,
      {
        new: true, //return thee updated document
        runValidators: true, // run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "employee not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server  error" });
  }
};

exports.deleteemployee = async (req, res) => {
  try {
    const employeeId = req.params.id; //extract the id  from the URL  parameter
    //  Assuming you have a employee model
    const response = await employee.findByIdAndDelete(employeeId);
    if (!response) {
      return res.status(404).json({ error: "employee not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "employee is deleted sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server  error" });
  }
};
