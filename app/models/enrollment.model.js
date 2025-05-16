import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
   admissionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admission"
   },
   courseIDs: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
   ],
   programID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required: true
   },
    academicYear: {
        type: Number,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    approve: {
        type: Boolean,
        default: false
    }
})

const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment