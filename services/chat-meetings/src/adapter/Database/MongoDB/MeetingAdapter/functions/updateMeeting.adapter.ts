import { Meeting } from "../../../../../Entities/Meeting";
import MeetingModel from "../../Modal/MeetingModel";

export const updateMeeting = async (meeting: Meeting) => {
  try {
    const newMeeting = await MeetingModel.findOneAndUpdate(
      { slug: meeting.slug },
      { $set: meeting },
      { new: true }
    );

    return newMeeting as Meeting;
  } catch (error) {
    console.log("MeetingAdapter: updateMeeting -> error", error);
    return false;
  }
};
