import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import express from "express";
import cors from "cors";
import envChecker from "./util/checkers/envChecker";
import cookieParser from "cookie-parser";
import { RabbitMQService } from "./infra/rabbitmq/rabbitmq.service";
import { TYPES } from "./constants/types/types";
import { QUEUES } from "./constants/types/queue";
import { SocketIOService } from "./infra/SocketIO/socket.service";
import http from "http";
import morgan from "morgan";

const server = new InversifyExpressServer(container);

server.setConfig(async (app) => {
  const url = process.env.FRONTEND_URL ?? "";

  app.use(cookieParser());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use(
    cors({
      origin: url.split(","),
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
    })
  );

  const rabbitMQService = container.get<RabbitMQService>(
    TYPES.RabbitMQServiceInitializer
  );
  await rabbitMQService.connect();
  await rabbitMQService.consumeMessages(QUEUES.CHAT_MEETING_USER_CREATION);
});

envChecker();

const app = server.build();

const httpServer = http.createServer(app);

httpServer.listen(process.env.PORT, () => {
  console.log("Server Started on:", process.env.PORT);
});

const socketIOService = container.get<SocketIOService>(
  TYPES.SocketIOServiceInitializer
);
socketIOService.init(httpServer);
