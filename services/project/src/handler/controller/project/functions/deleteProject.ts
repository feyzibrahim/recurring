import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";

export const deleteProject = async (
  req: Request,
  res: Response,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const { slug } = req.params;

    let project = await iProjectUseCase.deleteProject(slug as string);
    if (!project) {
      throw Error("No project found");
    }

    return res.status(200).json({
      project: project,
      success: true,
      message: "Project successfully Deleted",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
