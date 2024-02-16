import { Chat } from "../../../../../Entities/Chat";
import ChatModal from "../../Modal/ChatModal";

export const getChat = async (id: string) => {
  try {
    const chat = await ChatModal.findOne({ _id: id });
    return chat as Chat;
  } catch (error) {
    console.log("ChatAdapter: getChat -> error", error);
    return false;
  }
};
