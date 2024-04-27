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

const server = new InversifyExpressServer(container);

server.setConfig(async (app) => {
  const url = process.env.FRONTEND_URL ?? "";

  app.use(cookieParser());
  app.use(express.json());
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
});

envChecker();

server.build().listen(process.env.PORT, () => {
  console.log("Server Started on:", process.env.PORT);
});
