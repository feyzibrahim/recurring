import EmployeeModal from "../../Modal/EmployeeModal";

export const getExEmployees = async (organizationId: string) => {
  try {
    const employees = await EmployeeModal.find({
      organization: organizationId,
      isActive: false,
    });
    return employees;
  } catch (error) {
    console.log("EmployeeAdapter: getExEmployees -> error", error);
    return false;
  }
};
