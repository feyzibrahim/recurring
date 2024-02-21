"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { getProjects } from "@/app/lib/features/project/projectActions";
import { useRouter } from "next/navigation";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns } from "./projectColumns";
import EmptyFolder from "@/components/empty/EmptyFolder";

const ProjectTable: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const rowOnCLick = (slug: string) => router.push(`project/${slug}`);

  return (
    <div className="w-full text-sm pb-5">
      {projects && projects.length > 0 ? (
        <TanStackDataTable
          columns={columns}
          data={projects}
          pageTitle="Projects"
          newButton={
            <Link href="project/create">
              <Button>Create New Project</Button>
            </Link>
          }
          searchField="name"
          rowOnCLick={rowOnCLick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <EmptyFolder />
          <p className="mt-2">No projects where created yet!</p>
          <p className="text-sm py-2">Please Create One</p>
          <Link href="project/create">
            <Button>Create Meeting</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
