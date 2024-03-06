import mongoose, { Schema } from "mongoose";
import { Organization } from "../../../../Entities/Organization";
import { v4 as uuid } from "uuid";

const OrganizationSchema: Schema = new Schema(
  {
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    members: [{ type: Schema.Types.ObjectId }],
    departments: [{ type: Schema.Types.ObjectId }],
    website: {
      type: String,
    },
    address: {
      city: { type: String },
      country: { type: String },
      state: { type: String },
      street: { type: String },
      zipCode: { type: String },
    },
    industry: {
      type: String,
    },
    projects: [{ type: Schema.Types.ObjectId }],
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    subscriptionId: {
      type: Schema.Types.ObjectId,
    },
    subscriptionType: {
      type: String,
      enum: ["Free", "Pro", "Business"],
      default: "Free",
    },
    subscriptionStripeId: {
      type: String,
    },
    subscriptionActive: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      default: uuid,
    },
  },
  { timestamps: true }
);
export default mongoose.model<Organization>("Organization", OrganizationSchema);
