import MeetingModel from "../../Modal/MeetingModel";

export const getMeetings = async (organizationId: string) => {
  try {
    const chats = await MeetingModel.find({
      organization: organizationId,
    })
      .populate("participants", "firstName lastName username profileImageURL")
      .populate("organizer");
    return chats;
  } catch (error) {
    console.log("MeetingAdapter: getMeetings -> error", error);
    return false;
  }
};
