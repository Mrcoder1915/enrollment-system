// app/lib/models/instructor.js

import mongoose from 'mongoose';

const InstructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const Instructor = mongoose.models.Instructor || mongoose.model('Instructor', InstructorSchema);
export default  Instructor
