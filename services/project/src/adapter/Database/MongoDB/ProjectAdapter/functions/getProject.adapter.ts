import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModal";

export const getProject = async (id: string) => {
  try {
    const project = await ProjectModal.findOne({ _id: id });
    return project as Project;
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
