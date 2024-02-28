import { injectable } from "inversify";
import { Attendance } from "../../../../Entities/Attendance";
import { createAttendance } from "./functions/createAttendance.adapter";
import { getAttendanceList } from "./functions/getAttendanceList.adapter";
import { AttendanceAdapterInterface } from "../../../../interface/attendance/AttendanceAdapterInterface";
import { getAttendanceByUserId } from "./functions/getAttendanceByUserId.adapter";
import { SimpleFilter } from "../../../../constants/props/SimpleFilter";
import { checkExistingDate } from "./functions/checkExistingDate.adapter";
import { updateAttendance } from "./functions/updateAttendance.adapter";
import { getAttendanceLength } from "./functions/getAttendanceLength";

@injectable()
export class AttendanceAdapter implements AttendanceAdapterInterface {
  async getAttendanceList(
    id: string,
    filter: SimpleFilter
  ): Promise<boolean | Attendance[]> {
    return getAttendanceList(id, filter);
  }

  getAttendanceLength(
    id: string,
    filter: SimpleFilter
  ): Promise<number | boolean> {
    return getAttendanceLength(id, filter);
  }

  async createAttendance(
    Attendance: Attendance
  ): Promise<boolean | Attendance> {
    return createAttendance(Attendance);
  }

  async getAttendanceByUserId(
    userId: string,
    filter: SimpleFilter,
    skip: number,
    limit: number
  ): Promise<boolean | Attendance[]> {
    return getAttendanceByUserId(userId, filter, skip, limit);
  }
  async updateAttendance(
    attendance: Attendance
  ): Promise<boolean | Attendance> {
    return updateAttendance(attendance);
  }

  async checkExistingDate(
    attendance: Attendance
  ): Promise<boolean | Attendance> {
    return checkExistingDate(attendance);
  }
}
