import { inject, injectable } from "inversify";
import { Server, Socket } from "socket.io";
import { TYPES } from "../../constants/types/types";
import { ChatUseCaseInterface } from "../../interface/chat/ChatUseCaseInterface";
import { Chat } from "../../Entities/Chat";
import http from "http";
import { MessageUseCaseInterface } from "../../interface/message/MessageUseCaseInterface";
import { Message } from "../../Entities/Message";
import { UserUseCaseInterface } from "../../interface/user/UserUseCaseInterface";
import message from "./functions/message";

@injectable()
export class SocketIOService {
  private io!: Server;
  private onlineUsersList: { userId: string; socketId: string }[] = [];

  constructor(
    @inject(TYPES.ChatUseCaseInterface)
    private iChatUseCase: ChatUseCaseInterface,
    @inject(TYPES.MessageUseCaseInterface)
    private iMessageUseCase: MessageUseCaseInterface,

    @inject(TYPES.UserUseCaseInterface)
    private iUserUseCase: UserUseCaseInterface
  ) {}

  public init(app: http.Server): void {
    const url = process.env.FRONTEND_URL ?? "";

    this.io = new Server(app, {
      cors: {
        origin: url.split(","),
        credentials: true,
      },
    });

    this.io.on("connection", (socket: Socket) => {
      socket.on("online-user", (userId: string) => {
        this.onlineUsersList = this.onlineUsersList.filter(
          (user) => user.userId !== userId
        );

        this.onlineUsersList.push({ userId, socketId: socket.id });
        this.io.emit("get-online-users", this.onlineUsersList);
      });
      socket.on("test-online-user", () => {
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

      socket.on(
        "new-group-chat",
        async (data: {
          from: string;
          groupName: string;
          participants: [string];
          organization: string;
          groupDescription?: string;
          groupProfile?: string;
        }) => {
          let participants = [...data.participants, data.from];

          let chatData = {
            participants: participants,
            organization: data.organization,
            groupName: data.groupName,
            groupProfile: data.groupProfile,
            groupDescription: data.groupDescription,
            type: "group",
          };

          let chat = (await this.iChatUseCase.createChat(
            chatData as Chat
          )) as Chat;

          participants.map((part) => {
            const receiver = this.onlineUsersList.find(
              (user) => user.userId === part
            );
            if (receiver) {
              socket.to(receiver.socketId).emit("new-group-chatter", chat);
            }
          });
        }
      );

      socket.on("message", async (data) => {
        const message: Message = {
          content: data.content,
          type: data.type,
          chat: data.chat,
          from: data.from,
          to: data.to,
        };

        const messageSaved = (await this.iMessageUseCase.createMessage(
          message
        )) as Message;

        // this.io.sockets.emit("chat", data);
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );

        if (receiver) {
          this.io
            .to(receiver.socketId)
            .emit("message", { messageSaved, fromName: data.fromName });
        }

        const sender = this.onlineUsersList.find(
          (user) => user.userId === data.from
        );

        if (sender) {
          this.io
            .to(sender.socketId)
            .emit("message", { messageSaved, fromName: data.fromName });
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

      // Group Chat

      socket.on("join-group-chat-room", async (data: { slug: string }) => {
        socket.join(data.slug);
      });

      socket.on("group-message", async (roomId: string, data) => {
        const message: Message = {
          content: data.content,
          type: data.type,
          chat: data.chat,
          from: data.from,
        };
        const messageSaved = (await this.iMessageUseCase.createGroupMessage(
          message
        )) as Message;

        socket.to(roomId).emit("group-message", messageSaved);
      });

      socket.on(
        "typing-group",
        (
          roomId,
          data: {
            activeChat: string;
            from: { firstName: string; lastName: string };
          }
        ) => {
          socket.to(roomId).emit("typing-group", data);
        }
      );
      socket.on(
        "typing-stopped-group",
        (
          roomId,
          data: {
            activeChat: string;
            from: { firstName: string; lastName: string };
          }
        ) => {
          socket.to(roomId).emit("typing-stopped-group", data);
        }
      );

      // Video Call

      socket.on("video-call", async (data) => {
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );
        const caller = this.onlineUsersList.find(
          (user) => user.userId !== data.to
        );

        if (caller) {
          const user = await this.iUserUseCase.getUserById(caller.userId);
          data.user = user;
        }

        if (receiver) {
          this.io.to(receiver.socketId).emit("video-call", data);
        }
      });

      socket.on("video-call-declined", (data) => {
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );

        if (receiver) {
          this.io.to(receiver.socketId).emit("video-call-declined", data);
        }
      });
      socket.on("video-call-accepted", (data) => {
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );

        if (receiver) {
          this.io.to(receiver.socketId).emit("video-call-accepted", data);
        }
      });

      socket.on("video-call-hangup", (data) => {
        const receiver = this.onlineUsersList.find(
          (user) => user.userId === data.to
        );

        if (receiver) {
          this.io.to(receiver.socketId).emit("video-call-hangup", data);
        }
      });

      // socket.emit("me", socket.id);

      // socket.on("disconnect-video-call", () => {
      //   socket.broadcast.emit("callEnded");
      // });

      // socket.on("video-call-user", ({ userToCall, signalData, from, name }) => {
      //   this.io
      //     .to(userToCall)
      //     .emit("video-call-user", { signal: signalData, from, name });
      // });

      // socket.on("answer-call", (data: any) => {
      //   this.io.to(data.to).emit("call-accepted", data.signal);
      // });
    });
  }
}
