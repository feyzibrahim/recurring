import { Request, Response } from "express";
import {
  controller,
  httpDelete,
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
import { deleteProject } from "./functions/deleteProject";
import { getProjectsCompletedCount } from "./functions/getProjectsCompletedCount";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/project", requireAuth)
export class ProjectController {
  constructor(
    @inject(TYPES.ProjectUseCaseInterface)
    private iProjectUseCase: ProjectUseCaseInterface
  ) {}

  @httpGet("/")
  async getProjects(req: Request, res: Response) {
    await getProjects(req, res, this.iProjectUseCase);
  }

  @httpGet("/completed-count")
  async getProjectsCompletedCount(req: Request, res: Response) {
    await getProjectsCompletedCount(req, res, this.iProjectUseCase);
  }

  @httpGet("/:slug")
  async getProject(req: Request, res: Response) {
    await getProject(req, res, this.iProjectUseCase);
  }

  @httpPost("/")
  async createProject(req: Request, res: Response) {
    await createProject(req, res, this.iProjectUseCase);
  }

  @httpPatch("/:slug")
  async updateProject(req: Request, res: Response) {
    await updateProject(req, res, this.iProjectUseCase);
  }
  @httpDelete("/:slug")
  async deleteProject(req: Request, res: Response) {
    await deleteProject(req, res, this.iProjectUseCase);
  }
}
