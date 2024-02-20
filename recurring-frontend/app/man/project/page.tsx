import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectList from "./ProjectList";
import { ScrollArea } from "@/components/ui/scroll-area";
import NavbarLogged from "@/components/common/NavbarLogged";

const page = async () => {
  return (
    <ScrollArea className="w-full h-screen">
      <NavbarLogged />
      <div className="flex items-center justify-between  pt-16 p-5">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="project/create">
          <Button>Create New Project</Button>
        </Link>
      </div>
      <ProjectList />
    </ScrollArea>
  );
};

export default page;
