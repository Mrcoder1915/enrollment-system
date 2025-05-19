import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    instructorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    },
  year_sectionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Year_section"
   },
   courseID: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
   
   room:{
        type: Number,
        required: true
   },
    dayOfWeek :{
        type: Number,
        required: true
    },
    startTime: {
        type: Number,
        required:true
    },
    endTime: {
        type: Number,
        required: true
    }
})

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule