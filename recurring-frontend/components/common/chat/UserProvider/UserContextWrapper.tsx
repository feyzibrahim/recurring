"use client";
import React, { ReactNode } from "react";
import { UserContextProvider } from "./UserContextProvider";

const UserContextWrapper = ({ children }: { children: ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserContextWrapper;
