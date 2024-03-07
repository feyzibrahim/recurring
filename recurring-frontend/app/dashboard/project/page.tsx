import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectList from "@/components/common/project/ProjectList";
import { getOrganizationData } from "@/server/getOrganizationData";
import { OrganizationTypes } from "@/constants/Types";

const page = async () => {
  const organization: OrganizationTypes = await getOrganizationData();

  return (
    <div className="w-full">
      <ProjectList location="dashboard" organization={organization} />
    </div>
  );
};

export default page;
