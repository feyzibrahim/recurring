import { Request, Response } from "express";
import { MeetingUseCaseInterface } from "../../../../interface/meeting/MeetingUseCaseInterface";
import { Meeting } from "../../../../Entities/Meeting";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const createMeeting = async (
  req: Request,
  res: Response,
  iMeetingUseCase: MeetingUseCaseInterface
) => {
  try {
    let body = req.body as Meeting;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    body.organization = data.organization;
    body.participants.push(data.user);
    body.organizer = data.user;

    const formattedBody = {
      ...body,
      ...(body.startTime && {
        startTime: new Date(
          `${body.date.toString().split("T")[0]}T${body.startTime}:00.000Z`
        ),
      }),
      ...(body.endTime && {
        endTime: new Date(
          `${body.date.toString().split("T")[0]}T${body.endTime}:00.000Z`
        ),
      }),
    };

    let meeting = (await iMeetingUseCase.createMeeting(
      formattedBody
    )) as Meeting;

    return res.status(200).json({
      meeting: meeting,
      success: true,
      message: "Meeting successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
