import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const getTasksByUserId = async (userSlug: string) => {
  try {
    const tasks = await TaskModal.find({ assignee: userSlug }).populate(
      "assignee"
    );

    return tasks as Task[];
  } catch (error) {
    console.log("TaskAdapter: getTasksByUserId -> error", error);
    return false;
  }
};
