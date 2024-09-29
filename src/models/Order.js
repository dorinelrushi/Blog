import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    payerName: {
      type: String,
      required: true,
    },
    wordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Word", // Reference the Word model
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
