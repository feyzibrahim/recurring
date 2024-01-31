import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmployeeList from "./EmployeeList";
const page = () => {
  return (
    <div className="p-5 md:px-10 md:py-5 w-full overflow-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Employee</h1>
        <Link href="employee/create">
          <Button>Add Employee</Button>
        </Link>
      </div>
      <EmployeeList />
    </div>
  );
};

export default page;
