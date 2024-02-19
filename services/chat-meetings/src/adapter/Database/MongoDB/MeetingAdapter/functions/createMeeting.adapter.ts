import { Meeting } from "../../../../../Entities/Meeting";
import MeetingModal from "../../Modal/MeetingModel";

export const createMeeting = async (chat: Meeting) => {
  try {
    const newMeeting = await MeetingModal.create(chat);

    return newMeeting as Meeting;
  } catch (error) {
    console.log("MeetingAdapter: createMeeting -> error", error);
    return false;
  }
};
