import { Request, Response } from "express";
import { MeetingUseCaseInterface } from "../../../../interface/meeting/MeetingUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getMeetings = async (
  req: Request,
  res: Response,
  iMeetingUseCAse: MeetingUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    let meetings = await iMeetingUseCAse.getMeetings(data.organization);
    if (!meetings) {
      throw Error("No meeting found");
    }

    return res.status(200).json({
      meetings: meetings,
      success: true,
      message: "Meetings successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
