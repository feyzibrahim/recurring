"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const EmployeeSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="p-5 bg-secondary">
      <h1 className="text-2xl font-bold pr-5">Employees</h1>
      <div className="flex flex-col gap-2 my-5 text-sm">
        <Link href={"/dashboard/employee"} className="hover-text w-full">
          <div
            className={`px-3 py-2 rounded ${
              pathName === "/dashboard/employee" ? " bg-backgroundAccent text-foregroundAccent" : ""
            }`}
          >
            Employee List
          </div>
        </Link>
        <Link href={"/dashboard/employee/create"} className="hover-text">
          <div
            className={`px-3 py-2 rounded ${
              pathName === "/dashboard/employee/create" ? " bg-backgroundAccent text-foregroundAccent" : ""
            }`}
          >
            Create Employee
          </div>
        </Link>
        <Link href={"/dashboard/employee/leave-requests"} className="hover-text">
          <div
            className={`px-3 py-2 rounded ${
              pathName === "/dashboard/employee/leave-requests" ? " bg-backgroundAccent text-foregroundAccent" : ""
            }`}
          >
            Leave Requests
          </div>
        </Link>
        <Link href={"/dashboard/employee/ex"} className="hover-text">
          <div
            className={`px-3 py-2 rounded ${
              pathName === "/dashboard/employee/ex" ? " bg-backgroundAccent text-foregroundAccent" : ""
            }`}
          >
            Ex-employees
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
