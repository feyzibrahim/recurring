import { ScrollArea } from "@/components/ui/scroll-area";
import EmployeeList from "./EmployeeList";
const page = () => {
  return (
    <ScrollArea className="p-5 md:px-10 md:py-5 w-full h-screen">
      <EmployeeList />
    </ScrollArea>
  );
};

export default page;
