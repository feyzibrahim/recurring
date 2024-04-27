import { ScrollArea } from "@/components/ui/scroll-area";
import Plans from "./components/Plans";

const page = async () => {
  return (
    <ScrollArea className="py-5 h-screen w-full">
      <Plans />
    </ScrollArea>
  );
};

export default page;
