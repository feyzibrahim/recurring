"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EmployeeNav = ({ params }: { params: { id: string } }) => {
  const pathName = usePathname();

  return (
    <div className="flex gap-8 text-foregroundAccent text-sm overflow-x-auto bg-backgroundAccent px-5 rounded-b-md">
      <Link
        href={`/dashboard/employee/${params.id}`}
        className={`shrink-0 pb-2 ${
          pathName === `/dashboard/employee/${params.id}`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Details
      </Link>
      <Link
        href={`/dashboard/employee/${params.id}/attendance`}
        className={` ${
          pathName === `/dashboard/employee/${params.id}/attendance`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Attendance
      </Link>
      <Link
        href={`/dashboard/employee/${params.id}/salary`}
        className={` ${
          pathName === `/dashboard/employee/${params.id}/salary`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Salary
      </Link>
      <Link
        href={`/dashboard/employee/${params.id}/history`}
        className={` ${
          pathName === `/dashboard/employee/${params.id}/history`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        History
      </Link>
    </div>
  );
};

export default EmployeeNav;
