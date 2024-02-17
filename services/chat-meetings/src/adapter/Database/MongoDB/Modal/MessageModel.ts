import mongoose, { Schema, Document } from "mongoose";

interface TextContent {
  text: string;
}

interface ImageContent {
  imageURL: string;
  caption?: string;
}

interface FileContent {
  fileURL: string;
  fileName?: string;
  caption?: string;
}

interface AudioContent {
  audioURL: string;
  duration?: Date;
  caption?: string;
}

interface VideoContent {
  videoURL: string;
}

type Content =
  | TextContent
  | ImageContent
  | FileContent
  | AudioContent
  | VideoContent;

interface Message extends Document {
  content: Content;
  type: "text" | "image" | "file" | "audio" | "video";
  chat: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema: Schema<Message> = new Schema(
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
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<Message>("Message", messageSchema);

export default MessageModel;
