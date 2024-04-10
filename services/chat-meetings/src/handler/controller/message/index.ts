import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { MessageUseCaseInterface } from "../../../interface/message/MessageUseCaseInterface";
import { getMessages } from "./functions/getMessages";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { getGroupMessages } from "./functions/getGroupMessages";

@controller("/api/message", requireAuth)
export class MessageController {
  constructor(
    @inject(TYPES.MessageUseCaseInterface)
    private iMessageUseCase: MessageUseCaseInterface
  ) {}

  @httpGet("/group/:chatId")
  async getGroupMessages(req: Request, res: Response) {
    await getGroupMessages(req, res, this.iMessageUseCase);
  }

  @httpGet("/:chatId")
  async getMessages(req: Request, res: Response) {
    await getMessages(req, res, this.iMessageUseCase);
  }

  @httpPost("/")
  async createMessage(req: Request, res: Response) {
    throw Error("createMessage: Not Implemented");
    // await createMessage(req, res, this.iMessageUseCase);
  }

  @httpPatch("/")
  async updateMessage(req: Request, res: Response) {
    throw Error("updateMessage: Not Implemented");

    // await updateMessage(req, res, this.iMessageUseCase);
  }
}
