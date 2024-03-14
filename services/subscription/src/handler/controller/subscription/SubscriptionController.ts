import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
} from "inversify-express-utils";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { getPrices } from "./functions/getPrices";
import { createSubscription } from "./functions/createSubscription";
import { stripeCheckoutSessionCompleted } from "./functions/stripeCheckoutSessionCompleted";
import { SubscriptionUseCaseInterface } from "../../../interface/subscription/SubscriptionUseCaseInterface";
import { TYPES } from "../../../constants/types/types";
import { inject } from "inversify";
import { getSubscriptionDetails } from "./functions/getSubscriptionDetails";
import { RabbitMQUseCaseInterface } from "../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import { cancelSubscription } from "./functions/cancelSubscription";
import { getSubscriptionDetailsForAdmin } from "./functions/getSubscriptionDetailsForAdmin";
import { requireSuperAdminAccess } from "../../middleware/SuperAdminMiddleware";

@controller("/api/subscription")
export class SubscriptionController {
  constructor(
    @inject(TYPES.SubscriptionUseCaseInterface)
    private iSubscriptionUseCase: SubscriptionUseCaseInterface,
    @inject(TYPES.RabbitMQUseCaseInterface)
    private iRabbitMQUseCase: RabbitMQUseCaseInterface
  ) {}

  @httpGet("/")
  async getSubscriptionDetails(req: Request, res: Response) {
    await getSubscriptionDetails(req, res, this.iSubscriptionUseCase);
  }

  @httpGet("/prices", requireAuth)
  async getPrices(req: Request, res: Response) {
    await getPrices(req, res);
  }

  @httpPost("/", requireAuth)
  async createSubscription(req: Request, res: Response) {
    await createSubscription(req, res);
  }
  @httpDelete("/cancel", requireAuth)
  async cancelSubscription(req: Request, res: Response) {
    await cancelSubscription(
      req,
      res,
      this.iSubscriptionUseCase,
      this.iRabbitMQUseCase
    );
  }

  @httpPost("/create")
  async stripeCheckoutSessionCompleted(req: Request, res: Response) {
    await stripeCheckoutSessionCompleted(
      req,
      res,
      this.iSubscriptionUseCase,
      this.iRabbitMQUseCase
    );
  }

  @httpGet("/admin", requireSuperAdminAccess)
  async getSubscriptionDetailsForAdmin(req: Request, res: Response) {
    await getSubscriptionDetailsForAdmin(req, res);
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
