import { Request, Response } from "express";
import { stripe } from "../../../../adapter/stripe/stripe";

export const createSubscription = async (
  req: Request,
  res: Response
  // iOrgUseCase: ProjectUseCaseInterface
) => {
  const apiKey = process.env.STRIPE_SECRET;
  const { price, email } = req.body;

  try {
    const prices = await stripe.prices.list({
      apiKey,
    });

    const sub = prices.data.find(
      (val) => val.unit_amount === parseInt(price) * 100
    );

    if (!sub) {
      throw Error("Amount is found");
    }

    // ToDo: add customerId to user Schema on User service
    const customer = await stripe.customers.create({ email }, { apiKey });

    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: sub.id,
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/dashboard/billing`,
        cancel_url: `${process.env.FRONTEND_URL}/dashboard/billing/plans`,
        customer: customer.id,
      },
      { apiKey }
    );

    return res.status(200).json({
      session: session,
      success: true,
      message: "Subscription Session successfully created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
