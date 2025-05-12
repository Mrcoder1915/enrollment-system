import mongoose from "mongoose";

const registrarLoginSchema = new mongoose.Schema({
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
  collection: "InstructorPortal",
  timestamps: true,
});

const registrarLogin = mongoose.models.regidtrarLogin || mongoose.model("registrarLogin", registrarLoginSchema);

export default registrarLogin;
