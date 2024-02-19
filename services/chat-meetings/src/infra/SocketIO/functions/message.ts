import { Server } from "socket.io";
import { Message } from "../../../Entities/Message";
import { MessageUseCaseInterface } from "../../../interface/message/MessageUseCaseInterface";

const message = async (
  data: any,
  onlineUsersList: { userId: string; socketId: string }[],
  io: Server,
  iMessageUseCase: MessageUseCaseInterface
) => {
  const message: Message = {
    content: data.message,
    type: data.type,
    chat: data.chat,
    from: data.from,
    to: data.to,
  };

  await iMessageUseCase.createMessage(message);

  const receiver = onlineUsersList.find((user) => user.userId === data.to);

  if (receiver) {
    io.to(receiver.socketId).emit("message", data);
  }

  const sender = onlineUsersList.find((user) => user.userId === data.from);

  if (sender) {
    io.to(sender.socketId).emit("message", data);
  }
};

export default message;
