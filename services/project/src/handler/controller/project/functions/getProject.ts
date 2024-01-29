import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";

export const getProject = async (
  req: Request,
  res: Response,
  iOrgUseCase: ProjectUseCaseInterface
) => {
  try {
    const { id } = req.params;

    let org = await iOrgUseCase.getProject(id);
    if (!org) {
      throw Error("No project found");
    }

    return res.status(200).json({
      project: org,
      success: true,
      message: "Project successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
