import { Salary } from "../../../../../Entities/Salary";
import SalaryModal from "../../Modal/SalaryModel";

export const checkExistingDate = async (salary: Salary) => {
  try {
    const Salary = await SalaryModal.findOne({
      date: salary.date,
    });
    return Salary as Salary;
  } catch (error) {
    console.log("SalaryAdapter: checkExistingDate -> error", error);
    return false;
  }
};
