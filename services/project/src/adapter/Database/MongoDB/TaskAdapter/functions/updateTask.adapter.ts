import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const updateTask = async (slug: string, task: Task) => {
  try {
    const newTask = await TaskModal.findOneAndUpdate(
      { _id: slug },
      { $set: { ...task } },
      { new: true }
    );
    return newTask as Task;
  } catch (error) {
    console.log("TaskAdapter: updateTask -> error", error);
    return false;
  }
};
