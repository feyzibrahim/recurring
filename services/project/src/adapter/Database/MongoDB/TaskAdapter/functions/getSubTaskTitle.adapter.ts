import { Task } from "../../../../../Entities/Task";
import TaskModal from "../../Modal/TaskModel";

export const getSubTaskTitle = async (organizationId: string) => {
  try {
    const tasks = await TaskModal.find({
      organization: organizationId,
      status: { $ne: "archive" },
    });

    const subTaskTitles = tasks.reduce((accumulator: any, task: Task) => {
      if (task.subTasks) {
        task.subTasks.forEach((subTask) => {
          accumulator.push(subTask.title);
        });
      }
      return accumulator;
    }, []);

    return subTaskTitles;
  } catch (error) {
    console.log("TaskAdapter: getTask -> error", error);
    return false;
  }
};
