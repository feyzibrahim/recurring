import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const createTask = async (task: Task) => {
  try {
    const creation = await TaskModal.create(task);

    const newTask = await TaskModal.findById(creation._id).populate("assignee");

    return newTask as Task;
  } catch (error) {
    console.log("TaskAdapter: createTask -> error", error);
    return false;
  }
};
