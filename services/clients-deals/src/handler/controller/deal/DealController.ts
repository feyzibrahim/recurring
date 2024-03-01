import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { DealUseCaseInterface } from "../../../interface/deal/DealUseCaseInterface";
import { createDeal } from "./functions/createDeal";
import { getDeal } from "./functions/getDeal";
import { updateDeal } from "./functions/updateDeal";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { getDeals } from "./functions/getDeals";

@controller("/api/deal", requireAuth)
export class DealController {
  constructor(
    @inject(TYPES.DealUseCaseInterface)
    private iDealUseCase: DealUseCaseInterface
  ) {}

  @httpGet("/:slug")
  async getDeal(req: Request, res: Response) {
    await getDeal(req, res, this.iDealUseCase);
  }

  @httpGet("/")
  async getDeals(req: Request, res: Response) {
    await getDeals(req, res, this.iDealUseCase);
  }

  @httpPost("/")
  async createDeal(req: Request, res: Response) {
    await createDeal(req, res, this.iDealUseCase);
  }

  @httpPatch("/")
  async updateDeal(req: Request, res: Response) {
    await updateDeal(req, res, this.iDealUseCase);
  }
}
