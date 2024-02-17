import { Message } from "../../../../../Entities/Message";
import messageModal from "../../Modal/MessageModel";

export const createMessage = async (message: Message) => {
  try {
    const newMessage = await messageModal.create(message);

    return newMessage;
  } catch (error) {
    console.log("MessageAdapter: createMessage -> error", error);
    return false;
  }
};
