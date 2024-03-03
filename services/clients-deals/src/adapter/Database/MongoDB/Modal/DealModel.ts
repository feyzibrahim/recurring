import mongoose, { Schema } from "mongoose";
import { Deal } from "../../../../Entities/Deal";
import { v4 as uuid } from "uuid";

const activitySchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const noteSchema = new Schema(
  {
    content: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const dealModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    organization: {
      type: String,
    },
    amount: {
      type: Number,
    },
    expectedCloseDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["lead", "qualified", "proposal", "negotiation", "closed", "lost"],
      default: "lead",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    lastContacted: {
      type: Date,
    },
    slug: {
      type: String,
      default: uuid,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    activity: [activitySchema],
    note: [noteSchema],
  },
  { timestamps: true }
);

export default mongoose.model<Deal>("Deal", dealModel);
