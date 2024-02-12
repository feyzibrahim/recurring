import { Attendance } from "../../../../../Entities/Attendance";
import AttendanceModal from "../../Modal/AttendanceModel";

export const getAttendanceList = async (id: string) => {
  try {
    const attendance = await AttendanceModal.findOne({ _id: id });
    return attendance as Attendance;
  } catch (error) {
    console.log("AttendanceAdapter: getAttendanceList -> error", error);
    return false;
  }
};
