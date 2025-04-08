import mongoose from "mongoose";
import Student from "./student.model";

const enrollmentSchema = new mongoose.Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    coureID:{
        type :mongoose.Schema.Types.ObjectId,
        ref: Course
    },
    academicYear: {
        type: String,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
})

const Enrollment = new mongoose.model("Enrollment", admissionSchema);

export default Enrollment