import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const getTask = async (slug: string) => {
  try {
    const task = await TaskModal.findOne({
      slug: slug,
      status: { $ne: "archive" },
    })
      .populate("notes.user", "firstName lastName profileImageURL username")
      .populate(
        "notes.replay.user",
        "firstName lastName profileImageURL username"
      );

    return task as Task;
  } catch (error) {
    console.log("TaskAdapter: getTask -> error", error);
    return false;
  }
};
