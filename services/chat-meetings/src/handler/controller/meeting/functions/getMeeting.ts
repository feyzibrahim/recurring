import { Request, Response } from "express";
import { MeetingUseCaseInterface } from "../../../../interface/meeting/MeetingUseCaseInterface";

export const getMeeting = async (
  req: Request,
  res: Response,
  iMeetingUseCAse: MeetingUseCaseInterface
) => {
  try {
    const { slug } = req.params;

    let meeting = await iMeetingUseCAse.getMeeting(slug);
    if (!meeting) {
      throw Error("No meeting found");
    }

    return res.status(200).json({
      meeting: meeting,
      success: true,
      message: "Meetings successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
