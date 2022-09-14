const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Students");
const IdSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
});
module.exports = mongoose.model("Ids", IdSchema);
