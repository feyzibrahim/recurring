import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { ClientUseCaseInterface } from "../../../interface/client/ClientUseCaseInterface";
import { createClient } from "./functions/createClient";
import { getClient } from "./functions/getClient";
import { updateClient } from "./functions/updateClient";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { getClients } from "./functions/getClients";

@controller("/api/client", requireAuth)
export class ClientController {
  constructor(
    @inject(TYPES.ClientUseCaseInterface)
    private iClientUseCase: ClientUseCaseInterface
  ) {}

  @httpGet("/:slug")
  async getClient(req: Request, res: Response) {
    await getClient(req, res, this.iClientUseCase);
  }

  @httpGet("/")
  async getClients(req: Request, res: Response) {
    await getClients(req, res, this.iClientUseCase);
  }

  @httpPost("/")
  async createClient(req: Request, res: Response) {
    await createClient(req, res, this.iClientUseCase);
  }

  @httpPatch("/")
  async updateClient(req: Request, res: Response) {
    await updateClient(req, res, this.iClientUseCase);
  }
}
