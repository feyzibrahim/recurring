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
import { getProjects } from "./functions/getProjects";

@controller("/api/project")
export class ProjectController {
  constructor(
    @inject(TYPES.ProjectUseCaseInterface)
    private iProjectUseCase: ProjectUseCaseInterface
  ) {}

  @httpGet("/")
  async getProjects(req: Request, res: Response) {
    await getProjects(req, res, this.iProjectUseCase);
  }

  @httpGet("/:id")
  async getProject(req: Request, res: Response) {
    await getProject(req, res, this.iProjectUseCase);
  }

  @httpPost("/")
  async createProject(req: Request, res: Response) {
    await createProject(req, res, this.iProjectUseCase);
  }

  @httpPatch("/")
  async updateProject(req: Request, res: Response) {
    await updateProject(req, res, this.iProjectUseCase);
  }
}
