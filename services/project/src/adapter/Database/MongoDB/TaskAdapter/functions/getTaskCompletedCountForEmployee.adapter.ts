import CountByDay from "../../../../../constants/types/CountByDay";
import TaskModal from "../../Modal/TaskModel";
import { startOfMonth, endOfMonth } from "date-fns";
import mongoose from "mongoose";

export const getTaskCompletedCountForEmployee = async (employeeId: string) => {
  try {
    const startDateOfMonth = startOfMonth(new Date());
    const dueDateOfMonth = endOfMonth(new Date());

    const tasksByDay: CountByDay[] = await TaskModal.aggregate([
      {
        $match: {
          assignee: new mongoose.Types.ObjectId(employeeId),
          status: "completed",
          dueDate: {
            $gte: startDateOfMonth,
            $lte: dueDateOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$dueDate",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    return tasksByDay;
  } catch (error) {
    console.log("TaskAdapter: getTask -> error", error);
    return false;
  }
};
