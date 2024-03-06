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
import { getOrganizationForAdmin } from "./functions/getOrganizationForAdmin";
import { requireSuperAdminAccess } from "../../middleware/SuperAdminMiddleware";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/user/organization")
export class OrganizationController {
  constructor(
    @inject(TYPES.OrganizationUseCaseInterface)
    private iOrgUseCase: OrganizationUseCaseInterface
  ) {}

  @httpGet("/", requireAuth)
  async getOrganization(req: Request, res: Response) {
    await getOrganization(req, res, this.iOrgUseCase);
  }

  @httpPost("/", requireAuth)
  async createOrganization(req: Request, res: Response) {
    await createOrganization(req, res, this.iOrgUseCase);
  }

  @httpPatch("/", requireAuth)
  async updateOrganization(req: Request, res: Response) {
    await updateOrganization(req, res, this.iOrgUseCase);
  }

  @httpGet("/admin", requireSuperAdminAccess)
  async getOrganizationForAdmin(req: Request, res: Response) {
    await getOrganizationForAdmin(req, res, this.iOrgUseCase);
  }
}
