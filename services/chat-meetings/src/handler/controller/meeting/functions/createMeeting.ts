import { Request, Response } from "express";
import { MeetingUseCaseInterface } from "../../../../interface/meeting/MeetingUseCaseInterface";
import { Meeting } from "../../../../Entities/Meeting";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createMeeting = async (
  req: Request,
  res: Response,
  iMeetingUseCase: MeetingUseCaseInterface
) => {
  try {
    let body = req.body as Meeting;

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    body.organization = data.organization;
    body.participants.push(data.user);
    body.organizer = data.user;
    console.log("file: createMeeting.ts:21 -> body", body);

    // throw Error("osidfj");

    let meeting = (await iMeetingUseCase.createMeeting(body)) as Meeting;

    return res.status(200).json({
      meeting: meeting,
      success: true,
      message: "Meeting successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
