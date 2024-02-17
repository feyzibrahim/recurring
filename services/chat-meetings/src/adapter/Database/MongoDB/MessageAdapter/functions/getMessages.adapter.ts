import MessageModel from "../../Modal/MessageModel";

export const getMessages = async (chatId: string) => {
  try {
    const messages = await MessageModel.find({ chat: chatId });

    return messages;
  } catch (error) {
    console.log("ChatAdapter: getMessages -> error", error);
    return false;
  }
};
