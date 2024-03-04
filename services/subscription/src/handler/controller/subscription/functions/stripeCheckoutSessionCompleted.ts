import { Request, Response } from "express";
import { SubscriptionUseCaseInterface } from "../../../../interface/subscription/SubscriptionUseCaseInterface";
import { Subscription } from "../../../../Entities/Subscription";
import { validateJwt } from "@recurring/shared_library";
import { stripe } from "../../../../adapter/stripe/stripe";

export const stripeCheckoutSessionCompleted = async (
  req: Request,
  res: Response,
  iSubscriptionUseCase: SubscriptionUseCaseInterface
) => {
  try {
    const apiKey = process.env.STRIPE_SECRET;

    const { customerId } = req.body;
    const { access_token } = req.cookies;
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

    const planId = "";

    const subscriptData: Subscription = {
      customerId: customerId,
      organization: data.organization,
      user: data.user,
      planId: planId,
      subscriptionId: existingSubscriptions.data[0].id,
    };

    let subscription = await iSubscriptionUseCase.createSubscription(
      subscriptData
    );

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
