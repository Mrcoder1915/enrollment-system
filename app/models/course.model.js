import mongoose from "mongoose";
import Student from "./student.model";

const courseSchema = new mongoose.Schema({
    programID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Program
    },
    couresCode: {
        type: Number,
        required: true
    },
    couresName: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
})

const Coures = new mongoose.model("Coures", admissionSchema);

export default Coures