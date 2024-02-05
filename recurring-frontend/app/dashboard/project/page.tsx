import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectList from "./ProjectList";

const page = async () => {
  return (
    <div className="md:px-10 md:py-5 w-full overflow-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Project</h1>
        <Link href="project/create">
          <Button>Create New Project</Button>
        </Link>
      </div>
      <ProjectList />
    </div>
  );
};

export default page;
