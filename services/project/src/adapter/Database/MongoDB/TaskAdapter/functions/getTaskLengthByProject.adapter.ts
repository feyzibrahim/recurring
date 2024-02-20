import { SimpleFilter } from "../../../../../constants/props/SimpleFilter";
import TaskModal from "../../Modal/TaskModel";

export const getTaskLengthByProject = async (
  projectSlug: string,
  filter: SimpleFilter
) => {
  try {
    const length = await TaskModal.find({
      project: projectSlug,
      status: { $ne: "archive" },
      ...filter,
    }).countDocuments();

    return length;
  } catch (error) {
    console.log("TaskAdapter: getTasksByUserId -> error", error);
    return false;
  }
};
