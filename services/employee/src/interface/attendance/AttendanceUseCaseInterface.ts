import { Attendance } from "../../Entities/Attendance";
import { SimpleFilter } from "../../constants/props/SimpleFilter";

export interface AttendanceUseCaseInterface {
  getAttendanceList(
    id: string,
    filter: SimpleFilter
  ): Promise<Attendance[] | boolean>;
  getAttendanceByUserId(
    userId: string,
    filter: SimpleFilter,
    skip: number,
    limit: number
  ): Promise<Attendance[] | boolean>;
  getAttendanceLength(
    id: string,
    filter: SimpleFilter
  ): Promise<number | boolean>;
  createAttendance(attendance: Attendance): Promise<Attendance | boolean>;
  updateAttendance(attendance: Attendance): Promise<Attendance | boolean>;
  checkExistingDate(attendance: Attendance): Promise<Attendance | boolean>;
}
