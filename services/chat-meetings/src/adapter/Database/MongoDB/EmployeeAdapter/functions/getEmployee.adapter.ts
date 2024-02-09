import { Employee } from "../../../../../Entities/Employee";
import EmployeeModal from "../../Modal/EmployeeModal";

export const getEmployee = async (id: string) => {
  try {
    const project = await EmployeeModal.findOne({ _id: id });
    return project as Employee;
  } catch (error) {
    console.log("EmployeeAdapter: getEmployee -> error", error);
    return false;
  }
};
