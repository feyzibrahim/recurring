import mongoose, { Schema } from "mongoose";
import { Project } from "../../../../Entities/Project";
import { uuid } from "uuidv4";

const ProjectsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    default: uuid(),
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
  members: [{ type: Schema.Types.ObjectId }],
  status: {
    type: String,
    default: "planning",
    enum: ["planning", "active", "completed", "archive", "backlog"],
  },
  manager: {
    type: Schema.Types.ObjectId,
  },
  client: {
    type: Schema.Types.ObjectId,
  },
  deal: {
    type: Schema.Types.ObjectId,
  },
});

export default mongoose.model<Project>("Project", ProjectsSchema);
