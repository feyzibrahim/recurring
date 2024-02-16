import { injectable } from "inversify";
import { Server } from "socket.io";

@injectable()
export class SocketIOService {
  private io!: Server;

  constructor() {}

  public init(app: any): void {
    this.io = new Server(app, {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    });

    this.io.on("connection", (socket) => {
      socket.on("chat", (data) => {
        this.io.sockets.emit("chat", data);
      });
      socket.on("typing", (data) => {
        socket.broadcast.emit("typing", data);
      });
    });
  }
}
