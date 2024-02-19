import { Request, Response } from "express";
import { MeetingUseCaseInterface } from "../../../../interface/meeting/MeetingUseCaseInterface";
import { Meeting } from "../../../../Entities/Meeting";

export const updateMeeting = async (
  req: Request,
  res: Response,
  iMeetingUseCase: MeetingUseCaseInterface
) => {
  try {
    const { slug } = req.params;
    const meeting = req.body as Meeting;
    meeting.slug = slug;

    // const formattedBody = {
    //   ...meeting,
    //   ...(meeting.startTime && {
    //     startTime: new Date(
    //       `${meeting.date.toString().split("T")[0]}T${
    //         meeting.startTime
    //       }:00.000Z`
    //     ),
    //   }),
    //   ...(meeting.endTime && {
    //     endTime: new Date(
    //       `${meeting.date.toString().split("T")[0]}T${meeting.endTime}:00.000Z`
    //     ),
    //   }),
    // };
    // console.log("file: updateMeeting.ts:16 -> formattedBody", formattedBody);

    let updatedMeeting = await iMeetingUseCase.updateMeeting(meeting);
    if (!updatedMeeting) {
      throw Error("No meeting found");
    }

    return res.status(200).json({
      meeting: updatedMeeting,
      success: true,
      message: "Meeting successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
