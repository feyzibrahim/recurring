"use client";

import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { getProjects } from "@/app/lib/features/project/projectActions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import AvatarFallbackImage from "@/components/common/AvatarFallbackImage";

const ProjectTable: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div className="w-full text-sm px-5">
      <table className="w-full border-collapse my-2 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Name</th>
            <th className="border-t border-background p-3">Members</th>
            <th className="border-t border-background p-3">Start Date</th>
            <th className="border-t border-background p-3">End Date</th>
            <th className="border-t border-background p-3">Status</th>
            <th className="border-t border-background p-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project, index) => (
              <tr
                key={index}
                className="hover:bg-secondary cursor-pointer"
                onClick={() => router.push(`project/${project.slug}`)}
              >
                <td className="border-t border-background p-3">
                  <p className="hover:underline hover:opacity-80 cursor-pointer">
                    {project.name}
                  </p>
                </td>
                <td className="border-t border-background px-3 ">
                  <div className="flex items-center">
                    {project.members &&
                      project.members.map(
                        (member, index) =>
                          typeof member !== "string" && (
                            <Avatar
                              key={index}
                              className={`w-7 h-7 border ${
                                index !== 0 ? "-ml-2" : ""
                              }`}
                            >
                              <AvatarImage src={member.profileImageURL} />
                              <AvatarFallbackImage />
                            </Avatar>
                          )
                      )}
                    {project.members && project.members.length > 4 && (
                      <div className="relative flex items-center justify-center w-7 h-7 border -ml-2 rounded-full bg-background text-sm">
                        +{project.members.length - 4}
                      </div>
                    )}
                  </div>
                </td>
                <td className="border-t border-background p-3">
                  {format(new Date(project.startDate), "MMM d, yyyy")}
                </td>
                <td className="border-t border-background p-3">
                  {format(new Date(project.endDate), "MMM d, yyyy")}
                </td>
                <td className="border-t border-background p-3 capitalize">
                  {project.status}
                </td>
                <td className="border-t border-background p-3">
                  {project.description || "No description provided"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
