import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectList from "@/components/common/project/ProjectList";
import { OrganizationTypes } from "@/constants/Types";
import { getOrganizationData } from "@/server/getOrganizationData";

const page = async () => {
  const organization: OrganizationTypes = await getOrganizationData();

  return (
    <ScrollArea className="w-full h-screen">
      <ProjectList location="home" organization={organization} />
    </ScrollArea>
  );
};

export default page;
