import { Chat } from "../../../../../Entities/Chat";
import ChatModal from "../../Modal/ChatModal";

export const createChat = async (project: Chat) => {
  try {
    const newChat = await ChatModal.create(project);
    return newChat;
  } catch (error) {
    console.log("ChatAdapter: createChat -> error", error);
    return false;
  }
};
