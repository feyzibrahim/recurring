import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { requireAuth } from "../../middleware/AuthMiddleware";
import { getPrices } from "./functions/getPrices";
import { createSubscription } from "./functions/createSubscription";
import { stripeCheckoutSessionCompleted } from "./functions/stripeCheckoutSessionCompleted";
import { SubscriptionUseCaseInterface } from "../../../interface/subscription/SubscriptionUseCaseInterface";
import { TYPES } from "../../../constants/types/types";
import { inject } from "inversify";
import { getSubscriptionDetails } from "./functions/getSubscriptionDetails";
import { RabbitMQUseCaseInterface } from "../../../interface/rabbitmq/RabbitMQUseCaseInterface";

@controller("/api/subscription")
export class SubscriptionController {
  constructor(
    @inject(TYPES.SubscriptionUseCaseInterface)
    private iSubscriptionUseCase: SubscriptionUseCaseInterface,
    @inject(TYPES.RabbitMQUseCaseInterface)
    private iRabbitMQUseCase: RabbitMQUseCaseInterface
  ) {}

  @httpGet("/", requireAuth)
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

  @httpPost("/create")
  async stripeCheckoutSessionCompleted(req: Request, res: Response) {
    await stripeCheckoutSessionCompleted(
      req,
      res,
      this.iSubscriptionUseCase,
      this.iRabbitMQUseCase
    );
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
