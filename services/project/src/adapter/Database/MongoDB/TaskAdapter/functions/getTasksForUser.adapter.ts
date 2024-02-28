import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const getTasksForUser = async (userSlug: string) => {
  try {
    const tasks = await TaskModal.find({
      assignee: userSlug,
      status: { $ne: "archive" },
    }).populate("assignee");

    return tasks as Task[];
  } catch (error) {
    console.log("TaskAdapter: getTasksByForUser -> error", error);
    return false;
  }
};
