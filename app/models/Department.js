import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    programName: {
        type: String,
        required: true
    },
    programCode: {
        type: String,
        required: true
    },

})

const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department