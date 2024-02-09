import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const updateProject = async (slug: string, project: Project) => {
  try {
    await ProjectModal.findOneAndUpdate(
      { slug: slug },
      { $set: { ...project } },
      { new: true }
    );

    const populatedTask = await ProjectModal.findOne({ slug })
      .populate("manager")
      .populate("members");

    return populatedTask as Project;
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
