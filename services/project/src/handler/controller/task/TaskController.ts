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
import { TaskUseCaseInterface } from "../../../interface/task/TaskUseCaseInterface";
import { createTask } from "./functions/createTask";
import { getTask } from "./functions/getTask";
import { updateTask } from "./functions/updateTask";
import { getTasks } from "./functions/getTasks";
import { deleteTask } from "./functions/deleteTask";
import { ProjectUseCaseInterface } from "../../../interface/project/ProjectUseCaseInterface";
import { getTasksByProjectId } from "./functions/getTasksByProjectId";
import { updateTaskStatus } from "./functions/updateTaskStatus";
import { getTasksByUserId } from "./functions/getTasksByUserId";
import { getTasksForUser } from "./functions/getTasksForUser";

@controller("/api/task")
export class TaskController {
  constructor(
    @inject(TYPES.TaskUseCaseInterface)
    private iTaskUseCase: TaskUseCaseInterface,
    @inject(TYPES.ProjectUseCaseInterface)
    private iProjectUseCase: ProjectUseCaseInterface
  ) {}

  @httpGet("/")
  async getTasks(req: Request, res: Response) {
    await getTasks(req, res, this.iTaskUseCase);
  }
  @httpGet("/for-user")
  async getTasksForUser(req: Request, res: Response) {
    await getTasksForUser(req, res, this.iTaskUseCase);
  }

  @httpGet("/project/:projectSlug")
  async getTasksByProjectId(req: Request, res: Response) {
    await getTasksByProjectId(
      req,
      res,
      this.iTaskUseCase,
      this.iProjectUseCase
    );
  }
  @httpGet("/user/:userSlug")
  async getTasksByUserId(req: Request, res: Response) {
    await getTasksByUserId(req, res, this.iTaskUseCase);
  }

  @httpGet("/:slug")
  async getTask(req: Request, res: Response) {
    await getTask(req, res, this.iTaskUseCase);
  }

  @httpPost("/")
  async createTask(req: Request, res: Response) {
    await createTask(req, res, this.iTaskUseCase, this.iProjectUseCase);
  }

  @httpPatch("/by-task/:slug")
  async updateTaskStatus(req: Request, res: Response) {
    await updateTaskStatus(req, res, this.iTaskUseCase);
  }

  @httpPatch("/:slug")
  async updateTask(req: Request, res: Response) {
    await updateTask(req, res, this.iTaskUseCase);
  }

  @httpDelete("/:slug")
  async deleteTask(req: Request, res: Response) {
    await deleteTask(req, res, this.iTaskUseCase);
  }
}
