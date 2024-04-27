import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import express from "express";
import cors from "cors";
import envChecker from "./util/checkers/envChecker";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { RabbitMQService } from "./infra/rabbitmq/rabbitmq.service";
import { TYPES } from "./constants/types/types";
import { QUEUES } from "./constants/types/queue";
import cron from "node-cron";
import sendReminder from "./util/nodemailer/sendReminder";
import sendReminderTask from "./util/nodemailer/sendReminderTask";

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
  await rabbitMQService.consumeMessages(QUEUES.PROJECT_USER_CREATION);

  cron.schedule("0 0 * * *", async () => {
    sendReminder();
    sendReminderTask();
  });
});

envChecker();

server.build().listen(process.env.PORT, () => {
  console.log("Server Started on:", process.env.PORT);
});
