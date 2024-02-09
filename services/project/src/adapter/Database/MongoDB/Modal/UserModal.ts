import mongoose, { Schema } from "mongoose";
import { User } from "../../../../Entities/User";

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
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);
