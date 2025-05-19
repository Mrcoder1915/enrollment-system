
import mongoose from "mongoose";

const YearAndSectionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  }
});

const YearAndSection = mongoose.models.YearAndSection || mongoose.model("YearAndSection", YearAndSectionSchema);

export default YearAndSection;
