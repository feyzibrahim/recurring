import { Chat } from "../../../../../Entities/Chat";
import ChatModal from "../../Modal/ChatModal";

export const createChat = async (chat: Chat) => {
  try {
    const newChat = await ChatModal.create(chat);

    const populatedChat = await ChatModal.findOne({
      _id: newChat._id,
    }).populate("participants", "firstName lastName username profileImageURL");

    return populatedChat as Chat;
  } catch (error) {
    console.log("ChatAdapter: createChat -> error", error);
    return false;
  }
};
