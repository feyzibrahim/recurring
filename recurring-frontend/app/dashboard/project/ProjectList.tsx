"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import ProjectCard from "./ProjectCard";
import { useEffect } from "react";
import { getProjects } from "@/app/lib/features/project/projectActions";
import EmptyFolder from "@/components/empty/EmptyFolder";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProjectList = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <>
      {projects && projects.length > 0 ? (
        <div className="px-5 pb-5">
          <p className="bg-secondary p-2 mb-2 rounded-md">Planning</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project: any, index: number) => {
              if (project.status === "planning") {
                return <ProjectCard project={project} key={index} />;
              }
            })}
          </div>
          <p className="bg-secondary p-2 my-2 rounded-md">Active</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project: any, index: number) => {
              if (project.status === "active") {
                return <ProjectCard project={project} key={index} />;
              }
            })}
          </div>
          <p className="bg-secondary p-2 my-2 rounded-md">Completed</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project: any, index: number) => {
              if (project.status === "completed") {
                return <ProjectCard project={project} key={index} />;
              }
            })}
          </div>
          <p className="bg-secondary p-2 my-2 rounded-md">Backlog</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project: any, index: number) => {
              if (project.status === "backlog") {
                return <ProjectCard project={project} key={index} />;
              }
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

export default ProjectList;
