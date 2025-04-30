import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
}, { 
  collection: "facultyList",
  timestamps: true
});

const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);

export default Faculty;
