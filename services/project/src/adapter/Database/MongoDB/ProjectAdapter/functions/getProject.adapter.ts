import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const getProject = async (slug: string) => {
  try {
    const project = await ProjectModal.findOne({ slug: slug })
      .populate("manager")
      .populate("members");

    return project as Project;
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
