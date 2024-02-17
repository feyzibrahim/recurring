import mongoose, { Schema } from "mongoose";
import { Message } from "../../../../Entities/Message";

const messageSchema: Schema = new Schema(
  {
    content: {
      type: Schema.Types.Mixed,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "file", "audio", "video"],
      default: "text",
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<Message>("Message", messageSchema);

export default MessageModel;
