import mongoose, { Schema } from "mongoose";
import { Salary } from "../../../../Entities/Salary";

const salarySchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    bonuses: {
      type: Number,
    },
    allowances: {
      houseRentAllowance: { type: Number },
      medicalAllowance: { type: Number },
      travelAllowance: { type: Number },
    },
    deductions: {
      providentFund: { type: Number },
      tax: { type: Number },
    },
    netSalary: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Salary>("Salary", salarySchema);
