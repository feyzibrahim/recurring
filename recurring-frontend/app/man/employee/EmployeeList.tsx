"use client";
import { getEmployees } from "@/app/lib/features/employee/employeeActions";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import EmptyEmployee from "@/components/empty/EmptyEmployee";
import { Button } from "@/components/ui/button";
import { EmployeeTypes } from "@/constants/Types";
import Link from "next/link";
import { useEffect } from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = () => {
  const dispatch = useAppDispatch();

  const { employees } = useAppSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  return (
    <>
      {employees && employees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {employees.map((employee: EmployeeTypes, index: number) => {
            return <EmployeeCard employee={employee} key={index} />;
          })}
        </div>
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
    </>
  );
};

export default EmployeeList;
