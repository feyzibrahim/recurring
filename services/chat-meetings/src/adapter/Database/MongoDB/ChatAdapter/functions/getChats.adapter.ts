import ChatModal from "../../Modal/ChatModal";

export const getChats = async (userId: string) => {
  console.log("file: getChats.adapter.ts:4 -> getChats -> userId", userId);
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
