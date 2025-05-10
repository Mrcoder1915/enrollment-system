import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  instructorID: {
    type: Number,
    required: true,
    unique: true,
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending",
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

const Instructor = mongoose.models.Instructor || mongoose.model("Instructor", instructorSchema);
export default Instructor;
