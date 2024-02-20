import { inject, injectable } from "inversify";
import { Server, Socket } from "socket.io";
import { TYPES } from "../../constants/types/types";
import { ChatUseCaseInterface } from "../../interface/chat/ChatUseCaseInterface";
import { Chat } from "../../Entities/Chat";
import http from "http";
import { MessageUseCaseInterface } from "../../interface/message/MessageUseCaseInterface";
import { Message } from "../../Entities/Message";

@injectable()
export class SocketIOService {
  private io!: Server;
  private onlineUsersList: { userId: string; socketId: string }[] = [];

  constructor(
    @inject(TYPES.ChatUseCaseInterface)
    private iChatUseCase: ChatUseCaseInterface,
    @inject(TYPES.MessageUseCaseInterface)
    private iMessageUseCase: MessageUseCaseInterface
  ) {}

  public init(app: http.Server): void {
    this.io = new Server(app, {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    });

    this.io.on("connection", (socket: Socket) => {
      this.io.emit("get-online-users", this.onlineUsersList);

      socket.on("online-user", (userId: string) => {
        this.onlineUsersList = this.onlineUsersList.filter(
          (user) => user.userId !== userId
        );

        this.onlineUsersList.push({ userId, socketId: socket.id });
        this.io.emit("get-online-users", this.onlineUsersList);
      });
      socket.on("offline-user", (userId: string) => {
        this.onlineUsersList = this.onlineUsersList.filter(
          (user) => user.userId !== userId
        );
        this.io.emit("get-online-users", this.onlineUsersList);
      });
      socket.on("disconnect", () => {
        this.onlineUsersList = this.onlineUsersList.filter(
          (user) => user.socketId !== socket.id
        );
        this.io.emit("get-online-users", this.onlineUsersList);
      });

      socket.on(
        "new-chat",
        async (data: { from: string; to: string; organization: string }) => {
          let chatExists = await this.iChatUseCase.getChatsWithUserIds(
            data.from,
            data.to
          );

          if (typeof chatExists !== "boolean" && chatExists.length > 0) {
            console.log(
              "file: socket.service.ts:49 -> SocketIOService -> chatExists"
            );
          } else {
            let chatData = {
              participants: [data.from, data.to],
              organization: data.organization,
            };

            let chat = (await this.iChatUseCase.createChat(
              chatData as Chat
            )) as Chat;

            const receiver = this.onlineUsersList.find(
              (user) => user.userId === data.to
            );

            if (receiver) {
              this.io.to(receiver.socketId).emit("new-chat", chat);
            }
            const sender = this.onlineUsersList.find(
              (user) => user.userId === data.from
            );

            if (sender) {
              this.io.to(sender.socketId).emit("new-chat", chat);
            }
          }
        }
      );

      socket.on("message", async (data) => {
        const message: Message = {
          content: data.message,
          type: data.type,
          chat: data.chat,
          from: data.from,
          to: data.to,
        };

        await this.iMessageUseCase.createMessage(message);

        // this.io.sockets.emit("chat", data);
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );

        if (receiver) {
          this.io.to(receiver.socketId).emit("message", data);
        }

        const sender = this.onlineUsersList.find(
          (user) => user.userId === data.from
        );

        if (sender) {
          this.io.to(sender.socketId).emit("message", data);
        }
      });

      socket.on("typing", (data: { to: string; chat: string }) => {
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );

        if (receiver) {
          this.io.to(receiver.socketId).emit("typing", data);
        }
      });
      socket.on("typing-stopped", (data: { to: string; chat: string }) => {
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );

        if (receiver) {
          this.io.to(receiver.socketId).emit("typing-stopped", data);
        }
      });

      // Video Call

      socket.emit("me", socket.id);

      socket.on("disconnect-video-call", () => {
        socket.broadcast.emit("callEnded");
      });

      socket.on("video-call-user", ({ userToCall, signalData, from, name }) => {
        this.io
          .to(userToCall)
          .emit("video-call-user", { signal: signalData, from, name });
      });

      socket.on("answer-call", (data: any) => {
        this.io.to(data.to).emit("call-accepted", data.signal);
      });
    });
  }
}
