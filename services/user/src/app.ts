import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./inversify.config";
import express from "express";
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

server.build().listen(process.env.PORT, () => {
  console.log("Server Started on ", process.env.PORT);
});
