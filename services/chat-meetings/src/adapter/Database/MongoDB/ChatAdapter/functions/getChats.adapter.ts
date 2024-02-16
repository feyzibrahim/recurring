import ChatModal from "../../Modal/ChatModal";

export const getChats = async (userId: string) => {
  try {
    const chats = await ChatModal.find({ participants: userId }).populate(
      "participants",
      "firstName lastName username profileImageURL"
    );
    return chats;
  } catch (error) {
    console.log("ChatAdapter: getChats -> error", error);
    return false;
  }
};
