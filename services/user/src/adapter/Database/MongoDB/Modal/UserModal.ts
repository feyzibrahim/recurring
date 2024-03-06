import mongoose, { Schema } from "mongoose";
import { User } from "../../../../Entities/User";
import { v4 as uuid } from "uuid";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    dateOfBirth: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
      enum: ["owner", "employee", "manager"],
      default: "owner",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    profileImageURL: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    organization: {
      type: Schema.Types.ObjectId,
    },
    slug: {
      type: String,
      default: uuid,
    },
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);
