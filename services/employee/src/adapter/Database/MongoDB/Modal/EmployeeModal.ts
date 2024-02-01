import mongoose, { Schema } from "mongoose";
import { Employee } from "../../../../Entities/Employee";

const EmployeeSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  organization: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  profileImageURL: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  hiringDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  salary: {
    type: Number,
  },
  role: {
    type: String,
  },
  employeeType: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
});

export default mongoose.model<Employee>("Employee", EmployeeSchema);
