import { Attendance } from "../../../../../Entities/Attendance";
import { SimpleFilter } from "../../../../../constants/props/SimpleFilter";
import AttendanceModal from "../../Modal/AttendanceModel";

export const getAttendanceByUserId = async (
  id: string,
  filter: SimpleFilter
) => {
  try {
    const attendance = await AttendanceModal.find({
      employeeId: id,
      ...filter,
    });

    return attendance as Attendance[];
  } catch (error) {
    console.log("AttendanceAdapter: getAttendanceByUserId -> error", error);
    return false;
  }
};
