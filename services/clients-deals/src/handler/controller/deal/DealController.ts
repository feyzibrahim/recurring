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
import { addActivity } from "./functions/addActivity";
import { editActivity } from "./functions/editActivity";
import { addNote } from "./functions/addNote";
import { editNote } from "./functions/editNote";

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

  @httpPatch("/:slug")
  async updateDeal(req: Request, res: Response) {
    await updateDeal(req, res, this.iDealUseCase);
  }

  @httpPost("/activity/:slug")
  async addActivity(req: Request, res: Response) {
    await addActivity(req, res, this.iDealUseCase);
  }
  @httpPatch("/activity/:slug")
  async editActivity(req: Request, res: Response) {
    await editActivity(req, res, this.iDealUseCase);
  }

  @httpPost("/note/:slug")
  async addNote(req: Request, res: Response) {
    await addNote(req, res, this.iDealUseCase);
  }
  @httpPatch("/note/:slug")
  async editNote(req: Request, res: Response) {
    await editNote(req, res, this.iDealUseCase);
  }
}
