import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  scheduleId: {
    type: Number,
    required: true
  },
  courseID: {
    type: Number,
    required: true
  },
  instructorID: {
    type: Number,
    require: true
  },
  year_sectionID:{
    type: Number,
    required: true
  },
  room: {
    type: Number,
    required: true
  },
  day: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
});

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
