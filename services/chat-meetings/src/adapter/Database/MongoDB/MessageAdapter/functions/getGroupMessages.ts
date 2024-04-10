import MessageModel from "../../Modal/MessageModel";

export const getGroupMessages = async (chatId: string) => {
  try {
    const messages = await MessageModel.find({ chat: chatId }).populate(
      "from",
      "firstName lastName profileImageURL"
    );

    return messages;
  } catch (error) {
    console.log("ChatAdapter: getGroupMessages -> error", error);
    return false;
  }
};
