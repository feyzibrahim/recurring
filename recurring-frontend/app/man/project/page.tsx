import ProjectList from "@/components/common/project/ProjectList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrganizationTypes } from "@/constants/Types";
import { getOrganizationData } from "@/server/getOrganizationData";

const page = async () => {
  const organization: OrganizationTypes = await getOrganizationData();

  return (
    <ScrollArea className="w-full h-screen">
      <ProjectList location="man" organization={organization} />
    </ScrollArea>
  );
};

export default page;
