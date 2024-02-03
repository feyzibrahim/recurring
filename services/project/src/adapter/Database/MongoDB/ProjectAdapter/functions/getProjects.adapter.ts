import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModal";

export const getProjects = async (id: string) => {
  try {
    const project = await ProjectModal.find({ organization: id });
    return project as Project[];
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};