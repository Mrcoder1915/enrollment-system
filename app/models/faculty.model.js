import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  program: {
    type: String,
    enum: [
      "Bachelor of Science in Information Technology",
      "Bachelor of Science in Business Administration",
      "Bachelor of Secondary Education",
      "Bachelor of Science in Hospitality Management",
    ],
  },
  instructorID: {
    type: Number,
    required: true,
    unique: true,
  },
  departmentID: {
    type: String,
  },
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
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  collection: "instructorList",
  timestamps: true,
});

const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);
export default Faculty;