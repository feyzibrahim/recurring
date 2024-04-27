import { Message } from "../../../../../Entities/Message";
import messageModal from "../../Modal/MessageModel";

export const createGroupMessage = async (message: Message) => {
  try {
    const newMessage = await messageModal.create(message);

    const returnMessage = await messageModal
      .findOne({ _id: newMessage._id })
      .populate("from", "firstName lastName profileImageURL");

    return returnMessage as Message;
  } catch (error) {
    console.log("MessageAdapter: createGroupMessage -> error", error);
    return false;
  }
};
