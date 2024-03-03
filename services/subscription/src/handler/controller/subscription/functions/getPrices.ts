import { Request, Response } from "express";
import { stripe } from "../../../../adapter/stripe/stripe";

export const getPrices = async (
  req: Request,
  res: Response
  // iOrgUseCase: ProjectUseCaseInterface
) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET,
    });
    return res.status(200).json({
      prices: prices,
      success: true,
      message: "Prices successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
