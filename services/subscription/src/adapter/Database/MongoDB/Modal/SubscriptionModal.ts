import mongoose, { Schema } from "mongoose";
import { Subscription } from "../../../../Entities/Subscription";

const SubscriptionsSchema: Schema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  planId: {
    type: String,
  },
});

export default mongoose.model<Subscription>(
  "Subscription",
  SubscriptionsSchema
);
