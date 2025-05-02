import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    temporaryAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    educationalAttainment:{
        type:String,
        enum: ['High School', 'College', 'University'],
        required: true
    },
    program: {
        type: String,
        enum: ['BSIT', "BSBA", "BSE", "BSHM"],
        required: true
    },
    YearLevel:{
        type: Number,
        required: true
    },
    requirements: {
        type: Array,
        required: true
    }
})

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student