import mongoose from "mongoose";

const StudentAccountSchema = new mongoose.Schema({
    studentID:{
        type:String,
        required:true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

const Studentaccount = mongoose.models.Studentaccount || mongoose.model("Studentaccount", StudentAccountSchema);

export default Studentaccount