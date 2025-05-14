import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
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
  course: {
    type: String,
    required: true
  },

});

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", scheduleSchema);

export default Schedule;
