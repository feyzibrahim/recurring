import { Chat } from "../../../../../Entities/Chat";
import ChatModal from "../../Modal/ChatModal";

export const updateChat = async (chat: Chat) => {
  try {
    const newChat = await ChatModal.findOneAndUpdate(
      { _id: chat._id },
      { $set: chat },
      { new: true }
    );

    return newChat as Chat;
  } catch (error) {
    console.log("ChatAdapter: updateChat -> error", error);
    return false;
  }
};
