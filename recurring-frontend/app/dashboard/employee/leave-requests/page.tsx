import { DatePickerWithRange } from "@/components/custom/DatePickerWithRange";
import LeaveList from "./components/LeaveList";

const page = () => {
  return (
    <div className="md:mx-5 w-full px-5 md:px-0">
      <div className="pt-5 md:flex items-center justify-between">
        <h1 className="font-bold md:text-3xl">Leave Applications</h1>
        <DatePickerWithRange />
      </div>
      <LeaveList />
    </div>
  );
};

export default page;
