import mongoose, { Schema } from "mongoose";
import { Chat } from "../../../../Entities/Chat";
import { v4 as uuid } from "uuid";

const chatSchema: Schema = new Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type: {
      type: String,
      enum: ["one_to_one", "group"],
      default: "one_to_one",
    },
    groupName: { type: String },
    groupDescription: { type: String },
    groupProfile: { type: String },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    slug: {
      type: String,
      default: uuid,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Chat>("Chat", chatSchema);
