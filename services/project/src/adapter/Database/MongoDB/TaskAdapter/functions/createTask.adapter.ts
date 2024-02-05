import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const createTask = async (task: Task) => {
  try {
    const newTask = await TaskModal.create(task);
    return newTask;
  } catch (error) {
    console.log("TaskAdapter: createTask -> error", error);
    return false;
  }
};
