import { Request, Response } from "express";
import { AttendanceUseCaseInterface } from "../../../../interface/attendance/AttendanceUseCaseInterface";
import { Attendance } from "../../../../Entities/Attendance";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const createAttendance = async (
  req: Request,
  res: Response,
  iAttendanceUseCase: AttendanceUseCaseInterface
) => {
  try {
    let body = req.body as Attendance;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    let attendance = await iAttendanceUseCase.getAttendanceByUserId(
      data.user,
      {}
    );
    if (attendance) {
      throw Error("Attendance Already Exists");
    }

    // body.admin = data.user;

    let org = (await iAttendanceUseCase.createAttendance(body)) as Attendance;

    return res.status(200).json({
      attendance: org,
      success: true,
      message: "Attendance successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
