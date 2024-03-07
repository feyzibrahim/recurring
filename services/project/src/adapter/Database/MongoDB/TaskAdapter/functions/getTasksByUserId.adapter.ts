import { Task } from "../../../../../Entities/Task";
import { SimpleFilter } from "../../../../../constants/props/SimpleFilter";
import TaskModal from "../../Modal/TaskModel";

export const getTasksByUserId = async (
  userSlug: string,
  filter: SimpleFilter,
  skip: number,
  limit: number
) => {
  try {
    const tasks = await TaskModal.find({
      assignee: userSlug,
      status: { $ne: "archive" },
      ...filter,
    })
      .skip(skip)
      .limit(limit)
      .populate("assignee")
      .populate({ path: "notes.replay", populate: { path: "user" } });

    return tasks as Task[];
  } catch (error) {
    console.log("TaskAdapter: getTasksByUserId -> error", error);
    return false;
  }
};
