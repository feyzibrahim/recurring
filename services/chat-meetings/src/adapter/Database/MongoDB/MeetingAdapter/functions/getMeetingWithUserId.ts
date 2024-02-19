import { Meeting } from "../../../../../Entities/Meeting";
import MeetingModel from "../../Modal/MeetingModel";

export const getMeetingWithUserId = async (userId: string) => {
  try {
    const meetings = await MeetingModel.find({
      participants: userId,
    });
    return meetings as Meeting[];
  } catch (error) {
    console.log("ChatAdapter: getChats -> error", error);
    return false;
  }
};
