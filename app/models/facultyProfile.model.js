import mongoose from 'mongoose';

const facultyProfileSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    },  { collection: 'facultyProfile', 
    timestamps: true
});

const FacultyProfile = mongoose.models.FacultyProfile || mongoose.model('FacultyProfile', facultyProfileSchema);

export default FacultyProfile;