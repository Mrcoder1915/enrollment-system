import mongoose from "mongoose";
import Student from "./student.model";

const programSchema = new mongoose.Schema({
    ProgramID:{
        type:String,
        required:true,
        unique: true
    },
    programName: {
        type: Number,
        required: true
    },
    programCode: {
        type: Number,
        required: true
    },

})

const Program = new mongoose.model("Program", admissionSchema);

export default Program