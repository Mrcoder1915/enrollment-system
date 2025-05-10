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

<<<<<<< HEAD
const InstructorAccount = mongoose.models.InstructorAccount || mongoose.model("InstructorAccount", instructorAccountSchema);

export default InstructorAccount;
=======
const FacultyAccount = mongoose.models.FacultyAccount || mongoose.model("FacultyAccount", facultyAccountSchema);

export default FacultyAccount;
>>>>>>> 256a9a10abfc9b11b21a8a5b59e02c601c3f29c5
