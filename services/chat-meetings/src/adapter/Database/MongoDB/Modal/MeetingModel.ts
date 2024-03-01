import mongoose, { Schema } from "mongoose";
import { Meeting } from "../../../../Entities/Meeting";
import { v4 as uuid } from "uuid";

const meetingSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["offline", "online"],
      default: "offline",
    },
    status: {
      type: String,
      enum: ["scheduled", "active", "expired"],
      default: "scheduled",
    },
    slug: {
      type: String,
      default: uuid,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    location: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Meeting>("Meeting", meetingSchema);
