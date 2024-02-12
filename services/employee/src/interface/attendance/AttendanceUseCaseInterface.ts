import { Attendance } from "../../Entities/Attendance";
import { SimpleFilter } from "../../constants/props/SimpleFilter";

export interface AttendanceUseCaseInterface {
  getAttendanceList(id: string): Promise<Attendance | boolean>;
  getAttendanceByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<Attendance[] | boolean>;
  createAttendance(attendance: Attendance): Promise<Attendance | boolean>;
  updateAttendance(
    id: string,
    attendance: Attendance
  ): Promise<Attendance | boolean>;
}
