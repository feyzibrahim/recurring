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

    const { filter } = simpleQueryFilter(req);

    let attendances = await iAttendanceUseCase.getAttendanceByUserId(
      userSlug,
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
