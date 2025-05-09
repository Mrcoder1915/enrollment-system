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
<<<<<<< HEAD
        type: String,
        required: true
=======
        type: Date,
    
>>>>>>> master
    },
    emailAddress: {
        type: String,
        required: true
    },
    age: {
        type: Number,
<<<<<<< HEAD
       
=======
    
>>>>>>> master
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
<<<<<<< HEAD
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

=======
    
    }
>>>>>>> master
})

const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student