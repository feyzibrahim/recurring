import EmployeeModal from "../../Modal/EmployeeModal";

export const getEmployeesWithRole = async (
  organizationId: string,
  role: string
) => {
  try {
    const employees = await EmployeeModal.find({
      organization: organizationId,
      role: role,
    });
    return employees;
  } catch (error) {
    console.log("EmployeeAdapter: getEmployeesWithRole -> error", error);
    return false;
  }
};
