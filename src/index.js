const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const Studentdetais = require("../models/Studentdetails");
const Ids = require("../models/Id");
const data = require("./InitialData");
const { body, validationResult } = require("express-validators");
const { contentType } = require("express/lib/response");
const { application } = require("express");
const { urlencoded } = require("express");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
const dataLoading = async () => {
  try {
    const studentdata = await Studentdetais.create(data);
    const Id = await Ids.create({ id: 8 });
  } catch (e) {
    console.log("data loaded");
  }
};
dataLoading();

app.get("/api/student", async (req, res) => {
  try {
    let data = await Studentdetais.find();
    res.json(data);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
app.get("/api/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    let data = await Studentdetais.findOne({ id: id });
    if (data == null) {
      return res.status(404).json("invalid id ");
    }
    res.json(data);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});
app.post("/api/student", async (req, res) => {
  try {
    const details = req.body;
    const id = await Ids.findOne({ _id: "63109e39804574a55958ac93" });
    console.log(id);
    const idNumber = id.id;
    const updatedValue = idNumber + 1;
    const updatedid = await Ids.updateOne(
      { _id: "63109e39804574a55958ac93" },
      { id: updatedValue }
    );
    const data = await Studentdetais.create({ id: idNumber, ...details });
    res.setHeader("contentType", "application / x - www - form - urlencoded");
    res.json({
      data,
    });
    console.log(details);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
});
app.put("/api/student/:id", async (req, res) => {
  try {
    const updatedData = await Studentdetais.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { runValidators: true, new: true }
    );
    if (updatedData == null) {
      return res.status(400).json("invalid id ");
    }
    res.setHeader("contentType", "application / x - www - form - urlencoded");
    res.json(updatedData);
  } catch (e) {
    res.status(400).json("invalid update");
  }
});
app.delete("/api/student/:id", async (req, res) => {
  try {
    const deleteddData = await Studentdetais.findOneAndDelete({
      id: req.params.id,
    });
    if (deleteddData == null) {
      return res.status(404).json("invalid id ");
    }
    res.json({ deleteddData });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
