import mongoose from "mongoose";

const instructorAccountSchema = new mongoose.Schema({
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
  collection: "instructorAccounts",
  timestamps: true,
});

const InstructorAccount = mongoose.models.InstructorAccount || mongoose.model("InstructorAccount", instructorAccountSchema);

export default InstructorAccount;
