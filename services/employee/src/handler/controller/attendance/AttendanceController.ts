import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { AttendanceUseCaseInterface } from "../../../interface/attendance/AttendanceUseCaseInterface";
import { createAttendance } from "./functions/createAttendance";
import { getAttendance } from "./functions/getAttendanceList";
import { updateAttendance } from "./functions/updateAttendance";
import { createAttendanceByAdmin } from "./functions/createAttendanceByAdmin";
import { getAttendanceByUserId } from "./functions/getAttendanceByUserId";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/attendance", requireAuth)
export class AttendanceController {
  constructor(
    @inject(TYPES.AttendanceUseCaseInterface)
    private iAttendanceUseCase: AttendanceUseCaseInterface
  ) {}

  @httpGet("/")
  async getAttendance(req: Request, res: Response) {
    await getAttendance(req, res, this.iAttendanceUseCase);
  }

  @httpPost("/")
  async createAttendance(req: Request, res: Response) {
    await createAttendance(req, res, this.iAttendanceUseCase);
  }

  @httpPatch("/")
  async updateAttendance(req: Request, res: Response) {
    await updateAttendance(req, res, this.iAttendanceUseCase);
  }

  @httpPost("/admin")
  async createAttendanceByAdmin(req: Request, res: Response) {
    await createAttendanceByAdmin(req, res, this.iAttendanceUseCase);
  }

  @httpGet("/admin/:userSlug")
  async getAttendanceByUserId(req: Request, res: Response) {
    await getAttendanceByUserId(req, res, this.iAttendanceUseCase);
  }
}
