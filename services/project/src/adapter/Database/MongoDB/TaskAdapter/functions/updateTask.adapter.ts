import { Task } from "../../../../../Entities/Task";
import TaskModel from "../../Modal/TaskModel";

export const updateTask = async (slug: string, task: Task) => {
  console.log("file: updateTask.adapter.ts:5 -> updateTask -> slug", slug);
  try {
    await TaskModel.findOneAndUpdate({ _id: slug }, { $set: { ...task } });
    const populatedTask = await TaskModel.findOne({ _id: slug })
      .populate("project")
      .populate("assignee")
      .populate("notes.user");

    return populatedTask as Task;
  } catch (error) {
    console.log("TaskAdapter: updateTask -> error", error);
    return false;
  }
};
