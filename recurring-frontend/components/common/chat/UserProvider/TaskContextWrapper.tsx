import React, { ReactNode } from "react";
import { UserContextProvider } from "./UserContextProvider";
import { EmployeeTypes } from "@/constants/Types";

const UserContextWrapper = ({
  children,
  user,
}: {
  children: ReactNode;
  user: EmployeeTypes;
}) => {
  return <UserContextProvider user={user}>{children}</UserContextProvider>;
};

export default UserContextWrapper;
