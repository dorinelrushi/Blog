// /models/Word.js
import mongoose from "mongoose";

const WordSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Word || mongoose.model("Word", WordSchema);
