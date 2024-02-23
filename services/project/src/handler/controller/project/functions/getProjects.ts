import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const getProjects = async (
  req: Request,
  res: Response,
  iProjectUseCase: ProjectUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;
    const data = validateJwt(access_token);

    let projects = await iProjectUseCase.getProjects(data.organization);
    console.log("file: getProjects.ts:15 -> projects", projects);
    if (!projects) {
      throw Error("No project found");
    }

    return res.status(200).json({
      projects: projects,
      success: true,
      message: "Projects successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
