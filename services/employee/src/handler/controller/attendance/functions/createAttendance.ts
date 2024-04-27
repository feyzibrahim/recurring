import { Request, Response } from "express";
import { AttendanceUseCaseInterface } from "../../../../interface/attendance/AttendanceUseCaseInterface";
import { Attendance } from "../../../../Entities/Attendance";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createAttendance = async (
  req: Request,
  res: Response,
  iAttendanceUseCase: AttendanceUseCaseInterface
) => {
  try {
    const { type, remarks } = req.body;

    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);

    let body: any = {};
    if (type === "check-in") {
      body = {
        checkInTime: new Date(),
      };
    } else if (type === "check-out") {
      body = {
        checkOutTime: new Date(),
      };
    }

    body.date = new Date();
    body.employeeId = data.user;
    body.remarks = remarks;

    let attendance = await iAttendanceUseCase.checkExistingDate(
      body as Attendance
    );

    if (
      attendance &&
      typeof attendance !== "boolean" &&
      ((type === "check-in" && attendance.checkInTime) ||
        (type === "check-out" && attendance.checkOutTime))
    ) {
      throw new Error(`Attendance ${type} time already recorded`);
    }

    let jsonRes: any = {
      success: true,
      message: "Attendance successfully Created",
    };

    let att;
    if (type === "check-in") {
      att = (await iAttendanceUseCase.createAttendance(body)) as Attendance;
      jsonRes.update = false;
    } else {
      att = await iAttendanceUseCase.updateAttendance(body as Attendance);
      jsonRes.update = true;
    }

    jsonRes.attendance = att;

    return res.status(200).json(jsonRes);
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
