import EmployeeNav from "../EmployeeNav";

import { DatePickerWithRange } from "@/components/custom/DatePickerWithRange";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-5">
      <EmployeeNav params={params} />
      <div className="pt-5 flex items-center justify-between">
        <h1 className="font-bold md:text-3xl">Salary Details</h1>
        <div className="flex gap-3">
          <DatePickerWithRange />
          {/* <MarkAttendanceButton /> */}
        </div>
      </div>
      {/* <AttendanceList id={params.id} /> */}
    </div>
  );
};

export default page;
