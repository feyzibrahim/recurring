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

    const { filter, limit, skip } = simpleQueryFilter(req);

    let attendance = await iAttendanceUseCase.getAttendanceByUserId(
      data.user,
      filter,
      limit,
      skip
    );
    if (!attendance) {
      throw Error("No attendance found");
    }

    return res.status(200).json({
      attendance: attendance,
      success: true,
      message: "Attendance successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
