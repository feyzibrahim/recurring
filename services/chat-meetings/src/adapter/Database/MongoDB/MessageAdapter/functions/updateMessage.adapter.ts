import { Message } from "../../../../../Entities/Message";
import MessageModel from "../../Modal/MessageModel";

export const updateMessage = async (message: Message) => {
  try {
    const newMessage = await MessageModel.findOneAndUpdate(
      { _id: message._id },
      { $set: message },
      { new: true }
    );

    return newMessage as Message;
  } catch (error) {
    console.log("MessageAdapter: updateMessage -> error", error);
    return false;
  }
};
