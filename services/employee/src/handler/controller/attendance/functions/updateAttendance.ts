import { Request, Response } from "express";
import { AttendanceUseCaseInterface } from "../../../../interface/attendance/AttendanceUseCaseInterface";
import { Attendance } from "../../../../Entities/Attendance";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const updateAttendance = async (
  req: Request,
  res: Response,
  iAttendanceUseCase: AttendanceUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);
    const attendance = req.body as Attendance;
    console.log("updateAttendance: attendance", attendance);

    let org = await iAttendanceUseCase.updateAttendance(data.user, attendance);
    if (!org) {
      throw Error("No attendance found");
    }

    return res.status(200).json({
      attendance: org,
      success: true,
      message: "Attendance successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
