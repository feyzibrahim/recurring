import { Request, Response } from "express";
import { stripe } from "../../../../adapter/stripe/stripe";

export const getSubscriptionDetailsForAdmin = async (
  req: Request,
  res: Response
) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      expand: ["data.customer", "data.plan.product"],
    });

    return res.status(200).json({
      subscriptions: subscriptions.data,
      success: true,
      message: "Subscription details successfully fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
