export const TYPES = {
  // Chat
  ChatAdapterInterface: Symbol.for("ChatAdapterInterface"),
  ChatUseCaseInterface: Symbol.for("ChatUseCaseInterface"),

  // Message
  MessageAdapterInterface: Symbol.for("MessageAdapterInterface"),
  MessageUseCaseInterface: Symbol.for("MessageUseCaseInterface"),

  UserAdapterInterface: Symbol.for("UserAdapterInterface"),
  RabbitMQServiceInitializer: Symbol.for("RabbitMQServiceInitializer"),
  SocketIOServiceInitializer: Symbol.for("SocketIOServiceInitializer"),
};
