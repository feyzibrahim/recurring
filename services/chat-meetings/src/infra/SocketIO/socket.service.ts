import { inject, injectable } from "inversify";
import { Server, Socket } from "socket.io";
import { TYPES } from "../../constants/types/types";
import { ChatUseCaseInterface } from "../../interface/chat/ChatUseCaseInterface";
import { Chat } from "../../Entities/Chat";
import http from "http";

@injectable()
export class SocketIOService {
  private io!: Server;
  private onlineUsersList: { userId: string; socketId: string }[] = [];

  constructor(
    @inject(TYPES.ChatUseCaseInterface)
    private iChatUseCase: ChatUseCaseInterface
  ) {}

  public init(app: http.Server): void {
    this.io = new Server(app, {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    });

    this.io.on("connection", (socket: Socket) => {
      socket.on("online-user", (userId: string) => {
        this.onlineUsersList = this.onlineUsersList.filter(
          (user) => user.userId !== userId
        );

        this.onlineUsersList.push({ userId, socketId: socket.id });
      });
      socket.on("offline-user", (userId: string) => {
        this.onlineUsersList = this.onlineUsersList.filter(
          (user) => user.userId !== userId
        );
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

      socket.on("message", (data) => {
        console.log(
          "file: socket.service.ts:81 -> SocketIOService -> socket.on -> data",
          data
        );
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
      // socket.on("typing", (data) => {
      //   socket.broadcast.emit("typing", data);
      // });
    });
  }
}
