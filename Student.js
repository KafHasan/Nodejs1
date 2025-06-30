const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  gpa:        { type: Number, min: 0, max: 4 },
  birthDate:  { type: Date, default: Date.now },
  interests:  [String]
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;