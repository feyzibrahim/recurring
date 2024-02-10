import { Task } from "../../../../../Entities/Task";
import TaskModel from "../../Modal/TaskModel";

export const updateTask = async (slug: string, task: Task) => {
  try {
    await TaskModel.findOneAndUpdate({ _id: slug }, { $set: { ...task } });
    const populatedTask = await TaskModel.findOne({ slug })
      .populate("project")
      .populate("assignee");

    return populatedTask as Task;
  } catch (error) {
    console.log("TaskAdapter: updateTask -> error", error);
    return false;
  }
};
