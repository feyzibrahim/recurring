import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const getTasksByProjectId = async (projectSlug: string) => {
  try {
    const task = await TaskModal.find({
      project: projectSlug,
      status: { $ne: "archive" },
    }).populate("assignee");

    return task as Task[];
  } catch (error) {
    console.log("TaskAdapter: getTasksByProjectId -> error", error);
    return false;
  }
};
