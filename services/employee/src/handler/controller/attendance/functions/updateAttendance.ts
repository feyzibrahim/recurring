import { Request, Response } from "express";
import { AttendanceUseCaseInterface } from "../../../../interface/attendance/AttendanceUseCaseInterface";
import { Attendance } from "../../../../Entities/Attendance";

export const updateAttendance = async (
  req: Request,
  res: Response,
  iAttendanceUseCase: AttendanceUseCaseInterface
) => {
  try {
    const attendance = req.body as Attendance;

    let updatedAttendance = await iAttendanceUseCase.updateAttendance(
      attendance
    );
    if (!updatedAttendance) {
      throw Error("No attendance found");
    }

    return res.status(200).json({
      attendance: updatedAttendance,
      success: true,
      message: "Attendance successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
