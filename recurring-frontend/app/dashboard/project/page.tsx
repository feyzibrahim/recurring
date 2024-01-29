import { commonRequestProject } from "@/api/server_project";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import { CgWorkAlt } from "react-icons/cg";

const page = async () => {
  const projects = await commonRequestProject({
    method: "GET",
    url: "/project",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="md:px-10 md:py-5 w-full overflow-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">Project</h1>
        <Link href="project/create">
          <Button>Create New Project</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects &&
          projects.project &&
          projects.project.map((project: any, index: number) => {
            return (
              <div className="bg-backgroundAccent p-5 text-sm" key={index}>
                <div>
                  <div className="flex gap-5 pb-3">
                    <div className="bg-background p-2 text-2xl rounded-sm">
                      <CgWorkAlt />
                    </div>
                    <h4 className="font-semibold text-lg">{project.name}</h4>
                  </div>
                  <p className="text-foregroundAccent line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="h-[2px] rounded-full w-full bg-background my-4"></div>
                <div className="flex justify-between">
                  <div>
                    <h4>{project.members.length}</h4>
                    <p className="text-xs text-foregroundAccent">
                      Participants
                    </p>
                  </div>
                  <div>
                    <h4>{format(new Date(project.endDate), "dd.MM.yyyy")}</h4>
                    <p className="text-xs text-foregroundAccent">Due Date</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;
