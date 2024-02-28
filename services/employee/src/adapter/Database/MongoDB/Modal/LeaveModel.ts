import mongoose, { Schema } from "mongoose";
import { Leave } from "../../../../Entities/Leave";

const leaveSchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Leave>("Leave", leaveSchema);
