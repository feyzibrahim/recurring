import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { OrganizationUseCaseInterface } from "../../../interface/organization/OrganizationUseCaseInterface";
import { createOrganization } from "./functions/createOrganization";
import { getOrganization } from "./functions/getOrganization";
import { UserUseCaseInterface } from "../../../interface/user/UserUseCaseInterface";

@controller("/api/organization")
export class OrganizationController {
  constructor(
    @inject(TYPES.OrganizationUseCaseInterface)
    private iOrgUseCase: OrganizationUseCaseInterface,
    @inject(TYPES.UserUseCaseInterface)
    private iUserUseCase: UserUseCaseInterface
  ) {}

  @httpGet("/")
  async getOrganization(req: Request, res: Response) {
    await getOrganization(req, res, this.iOrgUseCase);
  }

  @httpPost("/")
  async createOrganization(req: Request, res: Response) {
    await createOrganization(req, res, this.iOrgUseCase, this.iUserUseCase);
  }
}
