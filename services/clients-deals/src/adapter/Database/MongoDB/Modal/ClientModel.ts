import mongoose, { Schema } from "mongoose";
import { Client } from "../../../../Entities/Client";
import { v4 as uuid } from "uuid";

const individualClientSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const companyClientSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
  },
});

const clientSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["individual", "company"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: uuid(),
    },
    phone: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    profileImageURL: {
      type: String,
    },
    individualDetails: individualClientSchema,
    companyDetails: companyClientSchema,
  },
  { timestamps: true }
);

export default mongoose.model<Client>("Client", clientSchema);
