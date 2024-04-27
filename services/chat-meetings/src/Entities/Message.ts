import { User } from "./User";

export class Message {
  constructor(
    public content:
      | TextContent
      | ImageContent
      | FileContent
      | AudioContent
      | VideoContent,
    public type: MessageType,
    public chat: string,
    public from: string | User,
    public to?: string,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}

// Define types for different content schemas
export interface TextContent {
  text: string;
}

export interface ImageContent {
  imageURL: string;
  caption?: string;
}

export interface FileContent {
  fileURL: string;
  fileName?: string;
  caption?: string;
}

export interface AudioContent {
  audioURL: string;
  duration?: Date;
  caption?: string;
}

export interface VideoContent {
  videoURL: string;
}

// Define type for message type enum
export type MessageType = "text" | "image" | "file" | "audio" | "video";
