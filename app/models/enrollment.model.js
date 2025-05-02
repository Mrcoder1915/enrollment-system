import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    courseID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    // scheduleID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Schhedule",
    //     required: true
    // },
    academicYear: {
        type: Number,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        enum: [0,1],
        default: 0
    }
})

const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment