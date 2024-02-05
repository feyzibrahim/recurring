import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const getProject = async (slug: string) => {
  console.log("file: getProject.adapter.ts:5 -> getProject -> slug", slug);
  try {
    const project = await ProjectModal.findOne({ slug: slug });
    return project as Project;
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
