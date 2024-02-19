import { Server } from "socket.io";
import { ChatUseCaseInterface } from "../../../interface/chat/ChatUseCaseInterface";
import { Chat } from "../../../Entities/Chat";

const newChat = async (
  data: {
    from: string;
    to: string;
    organization: string;
  },
  onlineUsersList: { userId: string; socketId: string }[],
  io: Server,
  iChatUseCase: ChatUseCaseInterface
) => {
  let chatExists = await iChatUseCase.getChatsWithUserIds(data.from, data.to);

  if (typeof chatExists !== "boolean" && chatExists.length > 0) {
    console.log("file: socket.service.ts:49 -> SocketIOService -> chatExists");
  } else {
    let chatData = {
      participants: [data.from, data.to],
      organization: data.organization,
    };

    let chat = (await iChatUseCase.createChat(chatData as Chat)) as Chat;

    const receiver = onlineUsersList.find((user) => user.userId === data.to);

    if (receiver) {
      io.to(receiver.socketId).emit("new-chat", chat);
    }
    const sender = onlineUsersList.find((user) => user.userId === data.from);

    if (sender) {
      io.to(sender.socketId).emit("new-chat", chat);
    }
  }
};

export default newChat;
