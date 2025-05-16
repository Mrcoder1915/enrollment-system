import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: true },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  midtermGrade: { type: Number, min: 1, max: 5 },
  finalGrade: { type: Number, min: 1, max: 5 },
  grade_computation: { type: Number, min: 1, max: 5 },
  remarks: { type: String, enum: ['passed', 'failed', 'inc'], required: true }
});

const Grade = mongoose.models.Grade || mongoose.model('Grade', gradeSchema);
export default Grade;
