import { Request, Response } from "express";
import { AttendanceUseCaseInterface } from "../../../../interface/attendance/AttendanceUseCaseInterface";
import { Attendance } from "../../../../Entities/Attendance";

export const createAttendanceByAdmin = async (
  req: Request,
  res: Response,
  iAttendanceUseCase: AttendanceUseCaseInterface
) => {
  try {
    let body = req.body as Attendance;
    let checkInTime = body.checkInTime;
    let checkOutTime = body.checkOutTime;

    const formattedBody = {
      ...body,
      checkInTime: new Date(
        `${body.date.toString().split("T")[0]}T${checkInTime}:00.000Z`
      ),
      checkOutTime: new Date(
        `${body.date.toString().split("T")[0]}T${checkOutTime}:00.000Z`
      ),
    };

    let attendance = (await iAttendanceUseCase.createAttendance(
      formattedBody
    )) as Attendance;

    return res.status(200).json({
      attendance: attendance,
      success: true,
      message: "Attendance successfully Marked",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
