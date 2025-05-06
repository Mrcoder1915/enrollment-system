import mongoose from "mongoose";

const facultyAccountSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending",
  },
  instructorID: {
    type: Number,
    required: true,
    unique: true,
  },
}, {
  collection: "facultyAccounts",
  timestamps: true,
});

const FacultyAccount = mongoose.models.FacultyAccount || mongoose.model("FacultyAccount", facultyAccountSchema);

export default FacultyAccount;
