import { Employee } from "../../../../../Entities/Employee";
import EmployeeModal from "../../Modal/EmployeeModal";

export const updateEmployee = async (employee: Employee) => {
  try {
    const newEmployee = await EmployeeModal.findOneAndUpdate(
      { _id: employee._id },
      { $set: employee },
      { new: true }
    );

    return newEmployee as Employee;
  } catch (error) {
    console.log("EmployeeAdapter: updateEmployee -> error", error);
    return false;
  }
};
