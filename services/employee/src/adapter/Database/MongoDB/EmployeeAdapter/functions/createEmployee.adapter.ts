import { Employee } from "../../../../../Entities/Employee";
import EmployeeModal from "../../Modal/EmployeeModal";

export const createEmployee = async (project: Employee) => {
  try {
    const newEmployee = await EmployeeModal.create(project);
    return newEmployee;
  } catch (error) {
    console.log("EmployeeAdapter: createEmployee -> error", error);
    return false;
  }
};
