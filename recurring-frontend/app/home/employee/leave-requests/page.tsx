import { DatePickerWithRange } from "@/components/custom/DatePickerWithRange";
import ApplyLeaveButton from "./components/ApplyLeaveButton";
import LeaveList from "./components/LeaveList";

const page = () => {
  return (
    <div className="mx-5 w-full">
      <div className="pt-5 flex items-center justify-between">
        <h1 className="font-bold md:text-3xl">Leave Applications</h1>
        <div className="flex gap-3">
          <DatePickerWithRange />
          <ApplyLeaveButton />
        </div>
      </div>
      <LeaveList />
    </div>
  );
};

export default page;
