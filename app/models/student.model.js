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
        type: String,
        required: true
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
    requirements: {
        type: Array,
        required: true
    } ,
    religion: {
        type: String,
        
    },
    birthPlace: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    citizenship: {
        type: String,
        required: true
    },
    civilStatus: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    extensionName: {
        type: String,
        required: true
    },
    height: {
        type: String,
        
    },
    weight: {
        type: String,
        
    },
    landline: {
        type: String,
        
    },
    lrn: {
        type: String,
        required: true
    },

})

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student