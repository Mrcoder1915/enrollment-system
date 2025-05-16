import mongoose from "mongoose";
import Student from "./student.model";

const admissionSchema = new mongoose.Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    remarks: {
        type:String,
        enum: ['pending', 'passed', 'failed'],
        default: 'pending'
    }
})

const Admission = mongoose.models.Admission || mongoose.model("Admission", admissionSchema);

export default Admission