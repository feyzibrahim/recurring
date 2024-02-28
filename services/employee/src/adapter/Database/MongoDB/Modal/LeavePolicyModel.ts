import mongoose, { Schema } from "mongoose";
import { LeavePolicy } from "../../../../Entities/LeavePolicy";

const leaveSchema = new Schema(
  {
    casualLeave: {
      type: Number,
      default: 1,
    },
    sickLeave: {
      type: Number,
      default: 1,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<LeavePolicy>("LeavePolicy", leaveSchema);
