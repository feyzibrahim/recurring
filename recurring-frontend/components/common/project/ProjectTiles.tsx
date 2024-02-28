"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";
import { getProjects } from "@/app/lib/features/project/projectActions";
import EmptyFolder from "@/components/empty/EmptyFolder";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectTypes } from "@/constants/Types";

const ProjectTiles = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      {projects && projects.length > 0 ? (
        <div className="px-5 pb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project: ProjectTypes, index: number) => {
              return <ProjectCard project={project} key={index} />;
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <EmptyFolder />
          <p className="mt-2">No Projects where created</p>
          <p className="text-sm py-2">Please Create One</p>
          <Link href="project/create">
            <Button>Create Project</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProjectTiles;
