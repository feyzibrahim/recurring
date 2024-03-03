import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { getPrices } from "./functions/getPrices";
import { createSubscription } from "./functions/createSubscription";

@controller("/api/subscription", requireAuth)
export class SubscriptionController {
  //   constructor() {} // private iOrgUseCase: ProjectUseCaseInterface // @inject(TYPES.ProjectUseCaseInterface)

  @httpGet("/prices")
  async getPrices(req: Request, res: Response) {
    await getPrices(req, res);
  }

  @httpPost("/")
  async createSubscription(req: Request, res: Response) {
    await createSubscription(req, res);
  }

  //   @httpPost("/")
  //   async createProject(req: Request, res: Response) {
  //     await createProject(req, res, this.iOrgUseCase);
  //   }

  //   @httpPatch("/")
  //   async updateProject(req: Request, res: Response) {
  //     await updateProject(req, res, this.iOrgUseCase);
  //   }
}
