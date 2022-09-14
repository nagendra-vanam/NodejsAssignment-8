const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Students");
const StudentdetaisSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  currentClass: { type: Number, required: true },
  division: { type: String, required: true },
});
module.exports = mongoose.model("Studentdetais", StudentdetaisSchema);
