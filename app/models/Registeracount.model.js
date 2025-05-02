import mongoose from "mongoose";

const RegistrarAccountSchema = new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registrar",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Registraraccount =  mongoose.models.Registraraccount || mongoose.model("Registraraccount", RegistrarAccountSchema)

export default Registraraccount