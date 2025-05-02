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
    
    },
    birthDate: {
        type: Date,
    
    },
    emailAddress: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    
    },
    temporaryAddress: {
        type: String,
    
    },
    permanentAddress: {
        type: String,
    
    },
    fatherName: {
        type: String,
        
    },
    motherName: {
        type: String,
    
    },
    educationalAttainment:{
        type:String,
        enum: ['High School', 'College', 'University'],
    
    },
    program: {
        type: String,
        enum: ['BSIT', "BSBA", "BSE", "BSHM"],

    },
    YearLevel:{
        type: Number,
        required: true
    },
    requirements: {
        type: Array,
    
    }
})

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student