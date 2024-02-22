import { Employee } from "../../../../../Entities/Employee";
import EmployeeModal from "../../Modal/EmployeeModal";

export const terminateEmployee = async (employee: Employee) => {
  try {
    const newEmployee = await EmployeeModal.findOneAndUpdate(
      { _id: employee._id },
      { $set: { ...employee, isActive: false } },
      { new: true }
    );

    return newEmployee as Employee;
  } catch (error) {
    console.log("EmployeeAdapter: terminateEmployee -> error", error);
    return false;
  }
};
