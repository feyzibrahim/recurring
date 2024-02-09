import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const appendProjectMember = async (
  projectId: string,
  userId: string
) => {
  try {
    const project = await ProjectModal.findOneAndUpdate(
      { _id: projectId },
      { $push: { members: userId } }
    );

    return project as Project;
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
