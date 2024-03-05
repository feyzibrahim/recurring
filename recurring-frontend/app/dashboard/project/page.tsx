import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectList from "@/components/common/project/ProjectList";
import { getOrganizationData } from "@/server/getOrganizationData";
import { OrganizationTypes } from "@/constants/Types";

const page = async () => {
  const organization: OrganizationTypes = await getOrganizationData();

  return (
    <ScrollArea className="w-full h-screen">
      <ProjectList location="dashboard" organization={organization} />
    </ScrollArea>
  );
};

export default page;
