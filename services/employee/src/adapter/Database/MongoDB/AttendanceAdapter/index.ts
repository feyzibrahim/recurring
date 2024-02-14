import { injectable } from "inversify";
import { Attendance } from "../../../../Entities/Attendance";
import { createAttendance } from "./functions/createAttendance.adapter";
import { getAttendanceList } from "./functions/getAttendanceList.adapter";
import { AttendanceAdapterInterface } from "../../../../interface/attendance/AttendanceAdapterInterface";
import { getAttendanceByUserId } from "./functions/getAttendanceByUserId.adapter";
import { SimpleFilter } from "../../../../constants/props/SimpleFilter";
import { checkExistingDate } from "./functions/checkExistingDate.adapter";
import { updateAttendance } from "./functions/updateAttendance.adapter";

@injectable()
export class AttendanceAdapter implements AttendanceAdapterInterface {
  async getAttendanceList(id: string): Promise<boolean | Attendance> {
    return getAttendanceList(id);
  }

  async createAttendance(
    Attendance: Attendance
  ): Promise<boolean | Attendance> {
    return createAttendance(Attendance);
  }

  async getAttendanceByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<boolean | Attendance[]> {
    return getAttendanceByUserId(userId, filter);
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
