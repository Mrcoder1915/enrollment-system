import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  instructorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true
  },
  year_sectionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "YearAndSection"
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  midtermGrade: {
    type: Number,
    required: true
  },
  finalGrade: {
    type: Number,
    required: true
  },
  grade_computation: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    enum: ['passed', 'failed', 'inc'],
    default: "inc"
  }
});

const Grade = mongoose.models.Grade || mongoose.model("Grade", gradeSchema);

export default Grade;
