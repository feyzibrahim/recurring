import { ScrollArea } from "@/components/ui/scroll-area";
import EmployeeList from "./EmployeeList";
const page = () => {
  return (
    <ScrollArea className="p-5 md:px-2 md:pt-16 md:pb-0 w-full h-screen">
      <EmployeeList />
    </ScrollArea>
  );
};

export default page;
