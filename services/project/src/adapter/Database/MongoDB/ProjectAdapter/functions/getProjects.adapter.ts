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

    return projects as Project[];
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
