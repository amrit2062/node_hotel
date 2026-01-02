const Person = require("../models/person");

exports.createPerson = async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains the person data

    // create the new person to the database
    console.log(data);
    const newPerson = new Person(data);

    //save the new person to the databases
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.getPerson = async (req, res) => {
  try {
    const data = await Person.find().limit();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
};

exports.getpersonWorktype = async (req, res) => {
  // const workType = req.params.workType; // extract the work type from url parameter
  // if (worktype == "chef" || workType == "manger" || worktype == "waiter") {
  // }
  try {
    const workType = req.params.workType; // extract the work type from url parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType }).limit();
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
exports.updatePerson = async (req, res) => {
  try {
    const personId = req.params.id; //extract the id  from the URL  parameter
    const updatedPersonDate = req.body; // updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonDate,
      {
        new: true, //return thee updated document
        runValidators: true, // run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server  error" });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const personId = req.params.id; //extract the id  from the URL  parameter
    //  Assuming you have a person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "person is deleted sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "Internal server  error" });
  }
};
