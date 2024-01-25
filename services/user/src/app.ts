import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import express from "express";
import cors from "cors";
import envChecker from "./util/checkers/envChecker";
import cookieParser from "cookie-parser";

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  const url = process.env.FRONTEND_URL ?? "";

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    cors({
      origin: [url],
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
    })
  );
});

envChecker();

server.build().listen(process.env.PORT, () => {
  console.log("Server Started on:", process.env.PORT);
});
