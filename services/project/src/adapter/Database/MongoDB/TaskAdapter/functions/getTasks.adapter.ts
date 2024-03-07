import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const getTasks = async (id: string) => {
  try {
    const task = await TaskModal.find({
      organization: id,
      status: { $ne: "archive" },
    })
      .populate("project")
      .populate("assignee")
      .populate({ path: "notes.replay", populate: { path: "user" } });

    return task as Task[];
  } catch (error) {
    console.log("TaskAdapter: getTask -> error", error);
    return false;
  }
};
