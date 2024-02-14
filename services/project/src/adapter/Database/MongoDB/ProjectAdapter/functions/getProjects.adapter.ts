import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";
import TaskModel from "../../Modal/TaskModel";

export const getProjects = async (id: string) => {
  try {
    const projects = await ProjectModal.find({
      organization: id,
      status: { $ne: "archive" },
    }).populate({
      path: "members",
      select: "firstName lastName profileImageURL",
    });
    // let pro;
    // if (typeof projects !== "boolean") {
    //   pro = await Promise.all(
    //     projects.map(async (pro: Project) => {
    //       let taskCount = await TaskModel.countDocuments({ project: pro._id });
    //       let completedCount = await TaskModel.countDocuments({
    //         project: pro._id,
    //         status: "completed",
    //       });
    //       return {
    //         ...pro,
    //         taskCount,
    //         completedCount,
    //       };
    //     })
    //   );
    // }
    // console.log("file: getProjects.adapter.ts:36 -> getProjects -> pro", pro);
    return projects as Project[];
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
