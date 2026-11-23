
import mongoose, { model, models } from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: [280, "Tweet cannot be more than 280 characters"],
    },
    author: {
      type: String,
      default: "anonymous",
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Tweet = models.Tweet ?? model("Tweet", TweetSchema);
