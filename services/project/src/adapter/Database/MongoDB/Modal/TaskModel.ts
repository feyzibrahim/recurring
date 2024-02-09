import mongoose, { Schema } from "mongoose";
import { Task } from "../../../../Entities/Task";
import { uuid } from "uuidv4";

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: uuid(),
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "planning",
      enum: ["planning", "active", "completed", "archive", "backlog"],
    },
    priority: {
      type: String,
    },
    assignee: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    tags: {
      type: [String],
    },
    subTasks: {
      type: [this],
    },
  },
  { timestamps: true }
);

export default mongoose.model<Task>("Task", TaskSchema);
