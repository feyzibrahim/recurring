import { OrganizationTypes } from "@/constants/Types";
import MeetingList from "./components/MeetingList";
import { getOrganizationData } from "@/server/getOrganizationData";

const page = async () => {
  const organization: OrganizationTypes = await getOrganizationData();

  return (
    <div className="w-full overflow-clip">
      <MeetingList organization={organization} />
    </div>
  );
};

export default page;
