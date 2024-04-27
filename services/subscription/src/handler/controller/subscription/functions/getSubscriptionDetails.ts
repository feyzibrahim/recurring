import { Request, Response } from "express";
import { SubscriptionUseCaseInterface } from "../../../../interface/subscription/SubscriptionUseCaseInterface";
import { validateJwt } from "@recurring/shared_library";
import { stripe } from "../../../../adapter/stripe/stripe";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getSubscriptionDetails = async (
  req: Request,
  res: Response,
  iSubscriptionUseCase: SubscriptionUseCaseInterface
) => {
  const apiKey = process.env.STRIPE_SECRET;

  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");

    const subscription = await iSubscriptionUseCase.getSubscription(
      data.organization
    );

    if (!subscription || typeof subscription === "boolean") {
      throw Error("Cannot find subscription");
    }

    const sub = await stripe.subscriptions.retrieve(
      subscription.subscriptionId,
      { apiKey }
    );
    const product = await stripe.products.retrieve(
      sub.items.data[0].price.product as string,
      { apiKey }
    );

    const invoices = await stripe.invoices.list(
      {
        subscription: subscription.subscriptionId,
      },
      { apiKey }
    );

    return res.status(200).json({
      subscription: sub,
      product: product,
      invoices: invoices,
      success: true,
      message: "Subscription details successfully fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
