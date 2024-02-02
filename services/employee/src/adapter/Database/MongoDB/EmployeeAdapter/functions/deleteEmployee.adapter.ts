import { Employee } from "../../../../../Entities/Employee";
import EmployeeModal from "../../Modal/EmployeeModal";

export const deleteEmployee = async (id: string) => {
  try {
    const newEmployee = await EmployeeModal.findOneAndDelete({ _id: id });
    return newEmployee as Employee;
  } catch (error) {
    console.log("EmployeeAdapter: deleteEmployee -> error", error);
    return false;
  }
};
