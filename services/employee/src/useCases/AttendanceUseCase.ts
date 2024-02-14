import { inject, injectable } from "inversify";
import { AttendanceUseCaseInterface } from "../interface/attendance/AttendanceUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Attendance } from "../Entities/Attendance";
import { SimpleFilter } from "../constants/props/SimpleFilter";

@injectable()
export class AttendanceUseCase implements AttendanceUseCaseInterface {
  constructor(
    @inject(TYPES.AttendanceAdapterInterface)
    private iAttendanceUseCase: AttendanceUseCaseInterface
  ) {}

  getAttendanceList(id: string): Promise<boolean | Attendance> {
    return this.iAttendanceUseCase.getAttendanceList(id);
  }

  getAttendanceByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<boolean | Attendance[]> {
    return this.iAttendanceUseCase.getAttendanceByUserId(userId, filter);
  }
  createAttendance(attendance: Attendance): Promise<boolean | Attendance> {
    return this.iAttendanceUseCase.createAttendance(attendance);
  }
  updateAttendance(attendance: Attendance): Promise<boolean | Attendance> {
    return this.iAttendanceUseCase.updateAttendance(attendance);
  }

  checkExistingDate(attendance: Attendance): Promise<boolean | Attendance> {
    return this.iAttendanceUseCase.checkExistingDate(attendance);
  }
}
