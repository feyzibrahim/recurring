import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { MeetingUseCaseInterface } from "../../../interface/meeting/MeetingUseCaseInterface";
import { createMeeting } from "./functions/createMeeting";
import { updateMeeting } from "./functions/updateMeeting";
import { getMeetings } from "./functions/getMeetings";
import { getMeeting } from "./functions/getMeeting";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/meeting", requireAuth)
export class MeetingController {
  constructor(
    @inject(TYPES.MeetingUseCaseInterface)
    private iMeetingUseCase: MeetingUseCaseInterface
  ) {}

  @httpGet("/")
  async getMeetings(req: Request, res: Response) {
    await getMeetings(req, res, this.iMeetingUseCase);
  }

  @httpGet("/:slug")
  async getMeeting(req: Request, res: Response) {
    await getMeeting(req, res, this.iMeetingUseCase);
  }

  @httpPost("/")
  async createMeeting(req: Request, res: Response) {
    await createMeeting(req, res, this.iMeetingUseCase);
  }

  @httpPatch("/:slug")
  async updateMeeting(req: Request, res: Response) {
    await updateMeeting(req, res, this.iMeetingUseCase);
  }
}
