import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    programID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course