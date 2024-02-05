import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const deleteTask = async (id: string) => {
  try {
    const task = await TaskModal.findOneAndDelete({ _id: id });
    return task as Task;
  } catch (error) {
    console.log("TaskAdapter: getTask -> error", error);
    return false;
  }
};
