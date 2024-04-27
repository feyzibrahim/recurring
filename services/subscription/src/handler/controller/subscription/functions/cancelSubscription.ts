import { Request, Response } from "express";
import { SubscriptionUseCaseInterface } from "../../../../interface/subscription/SubscriptionUseCaseInterface";
import { validateJwt } from "@recurring/shared_library";
import { stripe } from "../../../../adapter/stripe/stripe";
import { QUEUES } from "../../../../constants/types/queue";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const cancelSubscription = async (
  req: Request,
  res: Response,
  iSubscriptionUseCase: SubscriptionUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
) => {
  const apiKey = process.env.STRIPE_SECRET;

  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");

    const subscription = await iSubscriptionUseCase.getSubscription(
      data.organization
    );

    if (!subscription) {
      throw Error("No subscription exists");
    }

    let subData;

    if (typeof subscription !== "boolean") {
      subData = await stripe.subscriptions.cancel(subscription.subscriptionId, {
        apiKey,
      });
    }

    await iSubscriptionUseCase.deleteSubscription(data.organization);

    const messageData = {
      _id: data.organization,
      subscriptionId: null,
      subscriptionStripeId: "",
      subscriptionActive: false,
      subscriptionType: "Free",
    };

    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.ORGANIZATION_SUBSCRIPTION_UPDATES,
      messageData
    );

    return res.status(200).json({
      subData: subData,
      success: true,
      message: "Subscription details successfully fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
