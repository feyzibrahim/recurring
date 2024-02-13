"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const EmployeeNav = ({ params }: { params: { id: string } }) => {
  const pathName = usePathname();

  return (
    <div className="flex flex-wrap pb-3 md:pb-0 gap-2 md:gap-8 text-foregroundAccent text-sm bg-backgroundAccent px-5 rounded-b-md">
      <Link
        href={`/home/employee/${params.id}`}
        className={`shrink-0 pb-2 ${
          pathName === `/home/employee/${params.id}`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Details
      </Link>
      <Link
        href={`/home/employee/${params.id}/tasks`}
        className={` ${
          pathName === `/home/employee/${params.id}/tasks`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Tasks
      </Link>

      <Link
        href={`/home/employee/${params.id}/history`}
        className={` ${
          pathName === `/home/employee/${params.id}/history`
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
