import { ScrollArea } from "@/components/ui/scroll-area";
import BackButton from "./BackButton";
import CreateForm from "./EditForm";

const page = () => {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="p-5 flex items-center justify-between pb-2">
        <h1 className="text-2xl font-bold">Edit Employee</h1>
        <BackButton />
      </div>
      <CreateForm />
    </ScrollArea>
  );
};

export default page;
