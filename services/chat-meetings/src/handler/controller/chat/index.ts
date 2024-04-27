import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { ChatUseCaseInterface } from "../../../interface/chat/ChatUseCaseInterface";
import { createChat } from "./functions/createChat";
import { updateChat } from "./functions/updateChat";
import { getChat } from "./functions/getChat";
import { getChats } from "./functions/getChats";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/chat", requireAuth)
export class ChatController {
  constructor(
    @inject(TYPES.ChatUseCaseInterface)
    private iChatUseCase: ChatUseCaseInterface
  ) {}

  @httpGet("/")
  async getChats(req: Request, res: Response) {
    await getChats(req, res, this.iChatUseCase);
  }

  @httpGet("/:id")
  async getChat(req: Request, res: Response) {
    await getChat(req, res, this.iChatUseCase);
  }

  @httpPost("/")
  async createChat(req: Request, res: Response) {
    await createChat(req, res, this.iChatUseCase);
  }

  @httpPatch("/")
  async updateChat(req: Request, res: Response) {
    await updateChat(req, res, this.iChatUseCase);
  }
}
