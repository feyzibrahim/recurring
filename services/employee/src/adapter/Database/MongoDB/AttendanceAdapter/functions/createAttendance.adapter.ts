import { Attendance } from "../../../../../Entities/Attendance";
import AttendanceModal from "../../Modal/AttendanceModel";

export const createAttendance = async (attendance: Attendance) => {
  try {
    const newAttendance = await AttendanceModal.create(attendance);
    return newAttendance;
  } catch (error) {
    console.log("AttendanceAdapter: createAttendance -> error", error);
    return false;
  }
};
