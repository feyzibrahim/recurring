import mongoose, { Schema } from "mongoose";
import { Deal } from "../../../../Entities/Deal";
import { v4 as uuid } from "uuid";

const dealModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    expectedCloseDate: {
      type: Date,
      required: true,
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
  },
  { timestamps: true }
);

export default mongoose.model<Deal>("Deal", dealModel);
