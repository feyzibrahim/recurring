import mongoose, { Schema } from "mongoose";
import { Chat } from "../../../../Entities/Chat";

const chatSchema: Schema = new Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type: {
      type: String,
      enum: ["one_to_one", "group"],
      default: "one_to_one",
    },
    groupName: { type: String },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

export default mongoose.model<Chat>("Chat", chatSchema);
