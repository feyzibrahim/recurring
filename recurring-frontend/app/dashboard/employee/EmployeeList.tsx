"use client";

import { getEmployee } from "@/app/lib/features/employee/employeeActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import EmptyEmployee from "@/components/empty/EmptyEmployee";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const EmployeeList = () => {
  const dispatch = useAppDispatch();

  const { employee } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);

  return (
    <div className="h-full">
      {employee ? (
        <div>Hello</div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <EmptyEmployee />
          <p className="mt-2">No Employees where created</p>
          <p className="text-sm py-2">Please Create One</p>
          <Link href="employee/create">
            <Button>Create Employee</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
