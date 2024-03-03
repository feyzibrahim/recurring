import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: "2023-10-16",
});
