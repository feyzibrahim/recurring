import { Salary } from "../../../../../Entities/Salary";
import SalaryModal from "../../Modal/SalaryModel";

export const createSalary = async (salary: Salary) => {
  try {
    const newSalary = await SalaryModal.create(salary);
    return newSalary;
  } catch (error) {
    console.log("SalaryAdapter: createSalary -> error", error);
    return false;
  }
};
