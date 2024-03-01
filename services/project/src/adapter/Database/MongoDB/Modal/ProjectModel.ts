import mongoose, { Schema } from "mongoose";
import { Project } from "../../../../Entities/Project";
import { v4 as uuid } from "uuid";

const ProjectsSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: uuid,
    },
    startDate: {
      type: Date,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tasks: [{ type: Schema.Types.ObjectId }],
    description: {
      type: String,
    },
    endDate: {
      type: Date,
      required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      default: "planning",
      enum: ["planning", "active", "completed", "archive", "backlog"],
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: Schema.Types.ObjectId,
    },
    deal: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Project>("Project", ProjectsSchema);
