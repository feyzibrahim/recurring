import StatusDiv from "@/components/common/StatusDiv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectTypes } from "@/constants/Types";
import { format } from "date-fns";
import Link from "next/link";
import { CgWorkAlt } from "react-icons/cg";

const ProjectCard = ({ project }: { project: ProjectTypes }) => {
  return (
    <Link href={`project/${project.slug}`}>
      <div className="bg-backgroundAccent p-5 text-sm hover:opacity-80 rounded-md">
        <StatusDiv status={project.status} />
        <div>
          <div className="flex gap-5 pb-3 pt-1">
            <div className="bg-background p-2 text-2xl rounded-sm flex items-center justify-center">
              <CgWorkAlt />
            </div>
            <div>
              <h4 className="font-semibold text-lg">{project.name}</h4>
              <div className="flex">
                {project.members.map(
                  (member, index) =>
                    typeof member !== "string" && (
                      <Avatar key={index} className="w-5 h-5">
                        <AvatarImage src={member.profileImageURL} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )
                )}
              </div>
            </div>
          </div>
          <p className="text-foregroundAccent line-clamp-2">
            {project.description}
          </p>
        </div>
        <div className="h-[2px] rounded-full w-full bg-background my-4"></div>
        <div className="flex justify-between">
          <div>
            <h4>{project.members.length}</h4>
            <p className="text-xs text-foregroundAccent">Participants</p>
          </div>
          <div>
            <h4>{format(new Date(project.endDate), "dd.MM.yyyy")}</h4>
            <p className="text-xs text-foregroundAccent">Due Date</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
