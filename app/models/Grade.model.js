
import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  gradeID: { type: Number, required: true, unique: true },
  studentID: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  instructorID: { type: mongoose.Schema.Types.ObjectId, ref: 'instructor', required: true },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
  midtermGrade: { type: Number, min: 1, max: 5 },
  finalGrade: { type: Number, min: 1, max: 5 },
  grade_computation: { type: Number, min: 1, max: 5 },
  remarks: { type: String, enum: ['passed', 'failed', 'inc'], required: true }
});

const Grade = mongoose.models.Grade || mongoose.model('Grade', gradeSchema);

export default Grade;

