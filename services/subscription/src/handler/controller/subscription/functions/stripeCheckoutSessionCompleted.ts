import { Request, Response } from "express";
import { SubscriptionUseCaseInterface } from "../../../../interface/subscription/SubscriptionUseCaseInterface";
import { Subscription } from "../../../../Entities/Subscription";
import { validateJwt } from "@recurring/shared_library";
import { stripe } from "../../../../adapter/stripe/stripe";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import { QUEUES } from "../../../../constants/types/queue";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const stripeCheckoutSessionCompleted = async (
  req: Request,
  res: Response,
  iSubscriptionUseCase: SubscriptionUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
) => {
  try {
    const apiKey = process.env.STRIPE_SECRET;

    const { customerId } = req.body;
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");

    const existingSubscriptions = await stripe.subscriptions.list(
      {
        customer: customerId,
      },
      { apiKey }
    );

    if (existingSubscriptions.data.length === 0) {
      throw Error("No subscription found");
    }

    const dbSubExists =
      await iSubscriptionUseCase.getSubscriptionByOrganizationId(
        data.organization
      );

    let subscription: Subscription | boolean;
    let subscriptionData: Subscription = {
      customerId: customerId,
      organization: data.organization,
      user: data.user,
      subscriptionId: existingSubscriptions.data[0].id,
    };

    if (dbSubExists) {
      subscription = await iSubscriptionUseCase.updateSubscription(
        data.organization,
        subscriptionData
      );
    } else {
      subscription = await iSubscriptionUseCase.createSubscription(
        subscriptionData
      );
    }

    if (typeof subscription !== "boolean") {
      const sub = await stripe.subscriptions.retrieve(
        subscription.subscriptionId,
        { apiKey }
      );
      const product = await stripe.products.retrieve(
        sub.items.data[0].price.product as string,
        { apiKey }
      );

      const messageData = {
        _id: data.organization,
        subscriptionId: subscription._id,
        subscriptionStripeId: subscription.subscriptionId,
        subscriptionActive: true,
        subscriptionType: product.name,
      };

      iRabbitMQUseCase.sendDataToQueue(
        QUEUES.ORGANIZATION_SUBSCRIPTION_UPDATES,
        messageData
      );
    }

    return res.status(200).json({
      subscription: subscription,
      success: true,
      message: "Subscription created successfully",
    });
  } catch (error) {
    console.error("Error handling checkout session completed webhook:", error);
    res.status(500).send("Error processing webhook event.");
  }
};
