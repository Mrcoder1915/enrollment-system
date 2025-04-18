import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    departmentID:{
        type:String,
        required:true,
        unique: true
    },
    programName: {
        type: String,
        required: true
    },
    programCode: {
        type: String,
        required: true
    },

})

const Program = mongoose.models.Program || mongoose.model("Program", programSchema);

export default Program