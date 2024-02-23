import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const getProjectsCompletedCount = async (
  req: Request,
  res: Response,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;
    const data = validateJwt(access_token);

    let projectsCount = await iProjectUseCase.getProjectsCompletedCount(
      data.organization
    );
    if (!projectsCount) {
      throw Error("No project found");
    }

    return res.status(200).json({
      projectsCount: projectsCount,
      success: true,
      message: "Projects count successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
