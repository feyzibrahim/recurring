import ProjectList from "@/components/common/project/ProjectList";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = async () => {
  return (
    <ScrollArea className="w-full h-screen">
      <ProjectList location="man" />
    </ScrollArea>
  );
};

export default page;
