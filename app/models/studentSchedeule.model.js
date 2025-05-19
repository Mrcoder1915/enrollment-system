import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { stringifyCookie } from "next/dist/compiled/@edge-runtime/cookies";

const scheduleSchema = new mongoose.Schema({
  scheduleId: {
    type: Number,
    required: unique
  },
  courseID: {
    type: Number,
    required: unique
  },
  instructorID: {
    type: Number,
    require: unique
  },
  year_sectionID:{
    type: Number,
    required: unique
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
