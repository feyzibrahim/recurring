import { DatePickerWithRange } from "@/components/custom/DatePickerWithRange";
import ApplyLeaveButton from "./components/ApplyLeaveButton";
import LeaveList from "./components/LeaveList";
import { getOrganizationData } from "@/server/getOrganizationData";

const page = async () => {
  const organization = await getOrganizationData();

  return (
    <div className="mx-5 w-full">
      <div className="pt-5 flex items-center justify-between">
        <h1 className="font-bold md:text-3xl">Leave Applications</h1>
        <div className="flex gap-3">
          <DatePickerWithRange />
          <ApplyLeaveButton />
        </div>
      </div>

      <LeaveList organization={organization} />
    </div>
  );
};

export default page;
