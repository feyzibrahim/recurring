import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { ProjectUseCaseInterface } from "../../../interface/project/ProjectUseCaseInterface";
import { createProject } from "./functions/createProject";
import { getProject } from "./functions/getProject";
import { updateProject } from "./functions/updateProject";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/project/", requireAuth)
export class ProjectController {
  constructor(
    @inject(TYPES.ProjectUseCaseInterface)
    private iOrgUseCase: ProjectUseCaseInterface
  ) {}

  @httpGet("/")
  async getProject(req: Request, res: Response) {
    await getProject(req, res, this.iOrgUseCase);
  }

  @httpPost("/")
  async createProject(req: Request, res: Response) {
    await createProject(req, res, this.iOrgUseCase);
  }

  @httpPatch("/")
  async updateProject(req: Request, res: Response) {
    await updateProject(req, res, this.iOrgUseCase);
  }
}
