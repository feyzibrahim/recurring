import { Project } from "../../../../../Entities/Project";
import ProjectModal from "../../Modal/ProjectModel";

export const getProjectsByManagerId = async (managerId: string) => {
  try {
    const projects = await ProjectModal.find({
      manager: managerId,
      status: { $ne: "archive" },
    });
    // .populate({
    //   path: "members",
    //   select: "firstName lastName profileImageURL",
    // });
    return projects as Project[];
  } catch (error) {
    console.log("ProjectAdapter: getProject -> error", error);
    return false;
  }
};
