import { Request, Response } from "express";
import { AttendanceUseCaseInterface } from "../../../../interface/attendance/AttendanceUseCaseInterface";
import simpleQueryFilter from "../../../../util/filters/simpleQueryFilter";

export const getAttendanceByUserId = async (
  req: Request,
  res: Response,
  iAttendanceUseCase: AttendanceUseCaseInterface
) => {
  try {
    const { userSlug } = req.params;

    const { filter, limit, skip } = simpleQueryFilter(req);

    let attendances = await iAttendanceUseCase.getAttendanceByUserId(
      userSlug,
      filter,
      skip,
      limit
    );
    if (!attendances) {
      throw Error("No attendance found");
    }

    let length = await iAttendanceUseCase.getAttendanceLength(userSlug, filter);

    return res.status(200).json({
      attendances: attendances,
      length: length,
      success: true,
      message: "Attendance successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
