import EmployeeModal from "../../Modal/EmployeeModal";

export const getEmployees = async (organizationId: string) => {
  try {
    const employees = await EmployeeModal.find({
      organization: organizationId,
      isActive: true,
    });
    return employees;
  } catch (error) {
    console.log("EmployeeAdapter: getEmployees -> error", error);
    return false;
  }
};
