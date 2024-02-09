import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { Project } from "../../../../Entities/Project";

export const updateProject = async (
  req: Request,
  res: Response,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const { slug } = req.params;
    const pro = req.body as Project;

    let project = await iProjectUseCase.updateProject(slug as string, pro);
    if (!project) {
      throw Error("No project found");
    }

    return res.status(200).json({
      project: project,
      success: true,
      message: "Project successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
