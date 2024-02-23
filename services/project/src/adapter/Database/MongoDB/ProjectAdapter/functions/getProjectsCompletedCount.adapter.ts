import CountByDay from "../../../../../constants/types/CountByDay";
import ProjectModal from "../../Modal/ProjectModel";
import { startOfMonth, endOfMonth } from "date-fns";
import mongoose from "mongoose";

export const getProjectsCompletedCount = async (id: string) => {
  try {
    const startDateOfMonth = startOfMonth(new Date());
    const endDateOfMonth = endOfMonth(new Date());

    const projectsByDay: CountByDay[] = await ProjectModal.aggregate([
      {
        $match: {
          organization: new mongoose.Types.ObjectId(id),
          status: "completed",
          endDate: {
            $gte: startDateOfMonth,
            $lte: endDateOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$endDate",
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

    return projectsByDay;
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
