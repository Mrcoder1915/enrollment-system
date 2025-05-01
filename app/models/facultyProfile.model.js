import mongoose from 'mongoose';

const facultyProfileSchema = new mongoose.Schema(
  {
    program: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
  },
  {
    collection: 'facultyProfile',
    timestamps: true,
  }
);

const FacultyProfile =
  mongoose.models.FacultyProfile ||
  mongoose.model('FacultyProfile', facultyProfileSchema);

export default FacultyProfile;
