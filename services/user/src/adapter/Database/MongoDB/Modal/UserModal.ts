import mongoose, { Schema } from "mongoose";
import { User } from "../../../../Entities/User";

const userSchema = new Schema({
  id: Number,
  name: String,
  email: String,
});

export default mongoose.model<User>("User", userSchema);
