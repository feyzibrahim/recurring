"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EmployeeSidebar = () => {
  const pathName = usePathname();
  return (
    <div className="p-5 bg-secondary">
      <h1 className="text-2xl font-bold pr-5">Employees</h1>
      <div className="flex flex-col gap-2 my-5 text-sm">
        <Link href={"/home/employee"} className="hover-text w-full">
          <div
            className={`px-3 py-2 rounded ${
              pathName === "/home/employee"
                ? " bg-backgroundAccent text-foregroundAccent"
                : ""
            }`}
          >
            Employee List
          </div>
        </Link>

        <Link href={"/home/employee/attendance"} className="hover-text">
          <div
            className={`px-3 py-2 rounded ${
              pathName === "/home/employee/attendance"
                ? " bg-backgroundAccent text-foregroundAccent"
                : ""
            }`}
          >
            Attendance
          </div>
        </Link>
        <Link href={"/home/employee/leave-requests"} className="hover-text">
          <div
            className={`px-3 py-2 rounded ${
              pathName === "/home/employee/leave-requests"
                ? " bg-backgroundAccent text-foregroundAccent"
                : ""
            }`}
          >
            Leave Requests
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
