import EmployeeModal from "../../Modal/EmployeeModal";

export const getEmployees = async (organizationId: string) => {
  try {
    const project = await EmployeeModal.find({
      organization: organizationId,
    });
    return project;
  } catch (error) {
    console.log("EmployeeAdapter: getEmployees -> error", error);
    return false;
  }
};
