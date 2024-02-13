import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectList from "./ProjectList";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = async () => {
  return (
    <ScrollArea className="w-full h-screen">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>
      <ProjectList />
    </ScrollArea>
  );
};

export default page;
