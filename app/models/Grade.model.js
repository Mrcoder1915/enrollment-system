import mongoose from 'mongoose';

const gradeReportSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  instructor: { type: String, required: true },
  finalGrade: { type: String, required: true },
  remarks: { type: String, required: true },
  semester: { type: String, enum: ['1', '2'], required: true }
}, {
  timestamps: true // optional: adds createdAt and updatedAt fields
});

const Grade = mongoose.models.Grade || mongoose.model('Grade', gradeReportSchema);

export default Grade;
