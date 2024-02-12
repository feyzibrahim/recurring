import mongoose, { Schema } from "mongoose";
import { Attendance } from "../../../../Entities/Attendance";

const attendanceSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  checkOutTime: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["present", "absent", "half-day", "late"],
    default: "present",
  },
  remarks: String,
});

export default mongoose.model<Attendance>("Attendance", attendanceSchema);
