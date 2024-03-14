import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { SalaryUseCaseInterface } from "../../../interface/salary/SalaryUseCaseInterface";
import { createSalary } from "./functions/createSalary";
// import { getSalary } from "./functions/getSalaryList";
import { updateSalary } from "./functions/updateSalary";
import { createSalaryByAdmin } from "./functions/createSalaryByAdmin";
import { getSalaryByUserId } from "./functions/getSalaryByUserId";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/salary", requireAuth)
export class SalaryController {
  constructor(
    @inject(TYPES.SalaryUseCaseInterface)
    private iSalaryUseCase: SalaryUseCaseInterface
  ) {}

  // @httpGet("/")
  // async getSalary(req: Request, res: Response) {
  //   await getSalary(req, res, this.iSalaryUseCase);
  // }

  @httpPost("/")
  async createSalary(req: Request, res: Response) {
    await createSalary(req, res, this.iSalaryUseCase);
  }

  @httpPatch("/")
  async updateSalary(req: Request, res: Response) {
    await updateSalary(req, res, this.iSalaryUseCase);
  }

  @httpPost("/admin")
  async createSalaryByAdmin(req: Request, res: Response) {
    await createSalaryByAdmin(req, res, this.iSalaryUseCase);
  }

  @httpGet("/admin/:userSlug")
  async getSalaryByUserId(req: Request, res: Response) {
    await getSalaryByUserId(req, res, this.iSalaryUseCase);
  }
}
