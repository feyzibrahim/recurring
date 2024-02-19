import {} from "../../../../../Entities/Attendance";
import { SimpleFilter } from "../../../../../constants/props/SimpleFilter";
import AttendanceModal from "../../Modal/AttendanceModel";

export const getAttendanceLength = async (id: string, filter: SimpleFilter) => {
  try {
    const length = await AttendanceModal.find({
      employeeId: id,
      ...filter,
    }).countDocuments();

    return length;
  } catch (error) {
    console.log("AttendanceAdapter: getAttendanceLength -> error", error);
    return false;
  }
};
