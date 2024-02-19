import { Meeting } from "../../../../../Entities/Meeting";
import MeetingModel from "../../Modal/MeetingModel";

export const getMeeting = async (slug: string) => {
  try {
    const chat = await MeetingModel.findOne({
      slug: slug,
    }).populate(
      "participants",
      "firstName lastName username profileImageURL email phoneNumber"
    );
    return chat as Meeting;
  } catch (error) {
    console.log("MeetingAdapter: getMeetings -> error", error);
    return false;
  }
};
