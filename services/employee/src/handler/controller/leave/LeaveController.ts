import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { LeaveUseCaseInterface } from "../../../interface/leave/LeaveUseCaseInterface";
import { createLeave } from "./functions/createLeave";
import { getLeave } from "./functions/getLeave";
import { updateLeave } from "./functions/updateLeave";
import { getLeavesByUserId } from "./functions/getLeavesByUserId";
import { getLeavesForUser } from "./functions/getLeavesForUser";
import { getLeaves } from "./functions/getLeaves";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/leave", requireAuth)
export class LeaveController {
  constructor(
    @inject(TYPES.LeaveUseCaseInterface)
    private iLeaveUseCase: LeaveUseCaseInterface
  ) {}

  @httpGet("/user/:userSlug")
  async getLeavesByUserId(req: Request, res: Response) {
    await getLeavesByUserId(req, res, this.iLeaveUseCase);
  }

  @httpGet("/")
  async getLeaves(req: Request, res: Response) {
    await getLeaves(req, res, this.iLeaveUseCase);
  }

  @httpGet("/for-user")
  async getLeavesForUser(req: Request, res: Response) {
    await getLeavesForUser(req, res, this.iLeaveUseCase);
  }

  @httpGet("/:userSlug")
  async getLeave(req: Request, res: Response) {
    await getLeave(req, res, this.iLeaveUseCase);
  }

  @httpPost("/")
  async createLeave(req: Request, res: Response) {
    await createLeave(req, res, this.iLeaveUseCase);
  }

  @httpPatch("/")
  async updateLeave(req: Request, res: Response) {
    await updateLeave(req, res, this.iLeaveUseCase);
  }
}
