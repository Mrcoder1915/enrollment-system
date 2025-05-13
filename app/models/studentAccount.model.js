import mongoose from "mongoose";

const studentAccountSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Studentaccount = mongoose.models.Studentaccount || mongoose.model("Studentaccount", studentAccountSchema);

export default Studentaccount;
