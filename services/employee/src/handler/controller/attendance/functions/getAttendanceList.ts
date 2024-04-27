import { Request, Response } from "express";
import { AttendanceUseCaseInterface } from "../../../../interface/attendance/AttendanceUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import simpleQueryFilter from "../../../../util/filters/simpleQueryFilter";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getAttendance = async (
  req: Request,
  res: Response,
  iAttendanceUseCase: AttendanceUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    const { filter } = simpleQueryFilter(req);

    let attendances = await iAttendanceUseCase.getAttendanceList(
      data.user,
      filter
    );
    if (!attendances) {
      throw Error("No attendance found");
    }

    return res.status(200).json({
      attendances: attendances,
      success: true,
      message: "Attendance successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
