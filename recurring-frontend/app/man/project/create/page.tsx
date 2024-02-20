import { ScrollArea } from "@/components/ui/scroll-area";
import BackButton from "../../../../components/common/BackButton";
import CreateForm from "./CreateForm";

const page = () => {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">Create Project</h1>
        <BackButton />
      </div>
      <CreateForm />
    </ScrollArea>
  );
};

export default page;
