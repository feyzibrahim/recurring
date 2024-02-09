import { EmployeeTypes } from "@/constants/Types";
import React from "react";

const EmployeeNameFromStore = ({ employee }: { employee: EmployeeTypes }) => {
  return (
    <>
      {employee.firstName} {employee.lastName}
    </>
  );
};

export default EmployeeNameFromStore;
