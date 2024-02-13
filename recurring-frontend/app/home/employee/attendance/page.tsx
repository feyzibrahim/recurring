import MarkAttendanceButton from "./components/MarkAttendanceButton";
import { DatePickerWithRange } from "@/components/custom/DatePickerWithRange";

const page = () => {
  return (
    <div className="mx-5">
      <div className="pt-5 flex items-center justify-between">
        <h1 className="font-bold md:text-3xl">Attendance Logs</h1>
        <div className="flex gap-3">
          <DatePickerWithRange />
          <MarkAttendanceButton />
        </div>
      </div>
      {/* <AttendanceList  /> */}
    </div>
  );
};

export default page;
