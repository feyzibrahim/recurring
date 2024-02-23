import TaskModal from "../../Modal/TaskModel";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";
import mongoose from "mongoose";
import TaskCount from "../../../../../constants/types/TaskCount";

export const getTaskCount = async (
  organizationId: string,
  interval: string
) => {
  try {
    let startDate, endDate;

    switch (interval) {
      case "daily":
        endDate = endOfDay(new Date());
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 9);
        startDate = startOfDay(startDate);
        break;
      case "weekly":
        endDate = endOfWeek(new Date());
        startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 63);
        startDate = startOfWeek(startDate);
        break;
      case "monthly":
        endDate = endOfMonth(new Date());
        startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 9);
        startDate.setDate(1);
        startDate = startOfMonth(startDate);
        break;
      default:
        throw new Error("Invalid interval provided");
    }

    const tasksByInterval: TaskCount[] = await TaskModal.aggregate([
      {
        $match: {
          organization: new mongoose.Types.ObjectId(organizationId),
          status: { $ne: "archive" },
          dueDate: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                {
                  case: { $eq: [interval, "daily"] },
                  then: {
                    date: {
                      $dateToString: { format: "%Y-%m-%d", date: "$dueDate" },
                    },
                    status: "$status",
                  },
                },
                {
                  case: { $eq: [interval, "weekly"] },
                  then: {
                    date: {
                      $dateToString: { format: "%Y-%U", date: "$dueDate" },
                    },
                    status: "$status",
                  },
                },
                {
                  case: { $eq: [interval, "monthly"] },
                  then: {
                    date: {
                      $dateToString: { format: "%Y-%m", date: "$dueDate" },
                    },
                    status: "$status",
                  },
                },
              ],
              default: null,
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          counts: {
            $push: {
              k: "$_id.status",
              v: "$count",
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ date: "$_id" }, { $arrayToObject: "$counts" }],
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const allStatuses = ["completed", "planning", "active", "backlog"];

    // Iterate over the dates and fill in missing statuses with a count of 0
    tasksByInterval.forEach((entry: TaskCount) => {
      allStatuses.forEach((status: string) => {
        if (!(status in entry)) {
          entry[status as keyof TaskCount] = 0;
        }
      });
    });

    return tasksByInterval;
  } catch (error) {
    console.log("TaskAdapter: getTask -> error", error);
    return false;
  }
};
