import { Container } from "inversify";
import {
  connectToDatabase,
  disconnectFromDatabase,
} from "./config/dbConnection";

import { ChatAdapter } from "./adapter/Database/MongoDB/ChatAdapter";
import { ChatAdapterInterface } from "./interface/chat/ChatAdapterInterface";
import { TYPES } from "./constants/types/types";
import { ChatUseCaseInterface } from "./interface/chat/ChatUseCaseInterface";
import { UserAdapterInterface } from "./interface/user/UserAdapterInterface";
import { UserAdapter } from "./adapter/Database/MongoDB/UserAdapter/UserAdapter";
import { RabbitMQService } from "./infra/rabbitmq/rabbitmq.service";
import { ChatUseCase } from "./useCases/ChatUseCase";
import { ChatController } from "./handler/controller/chat";
import { SocketIOService } from "./infra/SocketIO/socket.service";
import { MessageAdapterInterface } from "./interface/message/MessageAdapterInterface";
import { MessageAdapter } from "./adapter/Database/MongoDB/MessageAdapter";
import { MessageUseCaseInterface } from "./interface/message/MessageUseCaseInterface";
import { MessageUseCase } from "./useCases/MessageUseCase";
import { MessageController } from "./handler/controller/message";

// Database connection
connectToDatabase();

const container = new Container();

// Chat Injection
container
  .bind<ChatAdapterInterface>(TYPES.ChatAdapterInterface)
  .to(ChatAdapter);
container
  .bind<ChatUseCaseInterface>(TYPES.ChatUseCaseInterface)
  .to(ChatUseCase);
container.bind<ChatController>(ChatController).toSelf();
container.bind<ChatUseCase>(ChatUseCase).toSelf();

// Message Injection
container
  .bind<MessageAdapterInterface>(TYPES.MessageAdapterInterface)
  .to(MessageAdapter);
container
  .bind<MessageUseCaseInterface>(TYPES.MessageUseCaseInterface)
  .to(MessageUseCase);
container.bind<MessageController>(MessageController).toSelf();
container.bind<MessageUseCase>(MessageUseCase).toSelf();

// User Injection
container
  .bind<UserAdapterInterface>(TYPES.UserAdapterInterface)
  .to(UserAdapter);

// RabbitMQ injection
container
  .bind<RabbitMQService>(TYPES.RabbitMQServiceInitializer)
  .to(RabbitMQService);

// Socket injection
container
  .bind<SocketIOService>(TYPES.SocketIOServiceInitializer)
  .to(SocketIOService);

// Disconnect From Database
process.on("SIGINT", async () => {
  await disconnectFromDatabase();
  process.exit(0);
});

export default container;
