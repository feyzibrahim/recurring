import { Request, Response } from "express";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { OrganizationUseCaseInterface } from "../../../interface/organization/OrganizationUseCaseInterface";
import { createOrganization } from "./functions/createOrganization";
import { getOrganization } from "./functions/getOrganization";
import { updateOrganization } from "./functions/updateOrganization";

@controller("/api/user/organization")
export class OrganizationController {
  constructor(
    @inject(TYPES.OrganizationUseCaseInterface)
    private iOrgUseCase: OrganizationUseCaseInterface
  ) {}

  @httpGet("/")
  async getOrganization(req: Request, res: Response) {
    await getOrganization(req, res, this.iOrgUseCase);
  }

  @httpPost("/")
  async createOrganization(req: Request, res: Response) {
    await createOrganization(req, res, this.iOrgUseCase);
  }

  @httpPatch("/")
  async updateOrganization(req: Request, res: Response) {
    await updateOrganization(req, res, this.iOrgUseCase);
  }
}
