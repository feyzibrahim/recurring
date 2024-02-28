import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectList from "@/components/common/project/ProjectList";

const page = async () => {
  return (
    <ScrollArea className="w-full h-screen">
      <ProjectList location="dashboard" />
    </ScrollArea>
  );
};

export default page;
