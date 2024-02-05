import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const createProject = async (project: Project) => {
  try {
    const newProject = await ProjectModal.create(project);
    return newProject;
  } catch (error) {
    console.log("ProjectAdapter: createProject -> error", error);
    return false;
  }
};
