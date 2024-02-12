import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const getProjects = async (id: string) => {
  try {
    const project = await ProjectModal.find({
      organization: id,
      status: { $ne: "archive" },
    }).populate({
      path: "members",
      select: "firstName lastName profileImageURL",
    });
    return project as Project[];
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
