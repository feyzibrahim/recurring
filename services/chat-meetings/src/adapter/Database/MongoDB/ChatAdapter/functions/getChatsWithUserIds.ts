import ChatModal from "../../Modal/ChatModal";

export const getChatsWithUserIds = async (
  userId: string,
  otherUser: string
) => {
  try {
    const chats = await ChatModal.find({
      $and: [
        { participants: userId },
        { participants: otherUser },
        { type: "one_to_one" },
      ],
    });
    return chats;
  } catch (error) {
    console.log("ChatAdapter: getChats -> error", error);
    return false;
  }
};
