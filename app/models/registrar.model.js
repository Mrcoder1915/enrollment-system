import mongoose from "mongoose";

const RegistrarSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    enrollmentStatus: {
        type: String,
        enum: ["Close", "Open"]
    }
})

const Registrar =  mongoose.models.Registrar || mongoose.model("Registrar", RegistrarSchema)

export default Registrar