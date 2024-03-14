import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { LeavePolicyUseCaseInterface } from "../../../interface/leavePolicy/LeavePolicyUseCaseInterface";
import { createLeavePolicy } from "./functions/createLeavePolicy";
import { updateLeavePolicy } from "./functions/updateLeavePolicy";
import { getLeavePolicy } from "./functions/getLeavePolicy";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/leavePolicy", requireAuth)
export class LeavePolicyController {
  constructor(
    @inject(TYPES.LeavePolicyUseCaseInterface)
    private iLeavePolicyUseCase: LeavePolicyUseCaseInterface
  ) {}

  @httpGet("/")
  async getLeavePolicy(req: Request, res: Response) {
    await getLeavePolicy(req, res, this.iLeavePolicyUseCase);
  }

  @httpPost("/")
  async createLeavePolicy(req: Request, res: Response) {
    await createLeavePolicy(req, res, this.iLeavePolicyUseCase);
  }

  @httpPatch("/")
  async updateLeavePolicy(req: Request, res: Response) {
    await updateLeavePolicy(req, res, this.iLeavePolicyUseCase);
  }
}
