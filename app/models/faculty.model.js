import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  instructorID: { type: Number, required: true, unique: true },
  departmentID: { type: Number },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  contactNumber: { type: String, required: true, unique: true },
  emailAddress: { type: String, required: true, unique: true },
}, {
  collection: "facultyList",
  timestamps: true,
});

const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);
export default Faculty;