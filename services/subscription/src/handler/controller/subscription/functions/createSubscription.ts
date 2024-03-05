import { Request, Response } from "express";
import { stripe } from "../../../../adapter/stripe/stripe";

export const createSubscription = async (
  req: Request,
  res: Response
  // iOrgUseCase: ProjectUseCaseInterface
) => {
  const apiKey = process.env.STRIPE_SECRET;
  const { price, email, address, name } = req.body;

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

    const cus = await stripe.customers.list({ email: email }, { apiKey });
    let customer;
    if (cus.data.length === 0) {
      // ToDo: add customerId to user Schema on User service
      customer = await stripe.customers.create(
        { email, name, address },
        { apiKey }
      );
    } else {
      customer = cus.data[0];
    }

    const existingSubscriptions = await stripe.subscriptions.list(
      {
        customer: customer.id,
      },
      { apiKey }
    );

    if (existingSubscriptions.data.length > 0) {
      throw Error(
        "Subscription Already Exists. Please cancel the old subscription and then continue"
      );
    }

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
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/failed`,
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
