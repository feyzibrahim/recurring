import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const deleteProject = async (id: string) => {
  try {
    const project = await ProjectModal.findOneAndDelete({ _id: id });
    return project as Project;
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
