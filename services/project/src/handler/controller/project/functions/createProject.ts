import { Request, Response } from "express";
import { ProjectUseCaseInterface } from "../../../../interface/project/ProjectUseCaseInterface";
import { Project } from "../../../../Entities/Project";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const createProject = async (
  req: Request,
  res: Response,
  iOrgUseCase: ProjectUseCaseInterface
) => {
  try {
    let body = req.body as Project;

    if (!body.manager) {
      throw Error("Please select manager or create a new manager");
    }

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    body.organization = data.organization;

    let project = (await iOrgUseCase.createProject(body)) as Project;
    console.log("file: createProject.ts:21 -> project", project);

    return res.status(200).json({
      project: project,
      success: true,
      message: "Project successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
