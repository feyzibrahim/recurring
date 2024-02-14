import { Leave } from "../../../../../Entities/Leave";
import { SimpleFilter } from "../../../../../constants/props/SimpleFilter";
import LeaveModal from "../../Modal/LeaveModel";

export const getLeavesByUserId = async (id: string, filter: SimpleFilter) => {
  try {
    const leave = await LeaveModal.find({
      employeeId: id,
      ...filter,
    });

    return leave as Leave[];
  } catch (error) {
    console.log("LeaveAdapter: getLeavesByUserId -> error", error);
    return false;
  }
};
