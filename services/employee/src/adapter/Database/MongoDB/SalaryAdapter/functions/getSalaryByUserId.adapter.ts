import { Salary } from "../../../../../Entities/Salary";
import { SimpleFilter } from "../../../../../constants/props/SimpleFilter";
import SalaryModal from "../../Modal/SalaryModel";

export const getSalaryByUserId = async (id: string, filter: SimpleFilter) => {
  try {
    const salary = await SalaryModal.find({
      employeeId: id,
      ...filter,
    });

    return salary as Salary[];
  } catch (error) {
    console.log("SalaryAdapter: getSalaryByUserId -> error", error);
    return false;
  }
};
