"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { getProjects } from "@/app/lib/features/project/projectActions";
import { useRouter } from "next/navigation";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns, columnsDashboard } from "./projectColumns";
import EmptyFolder from "@/components/empty/EmptyFolder";
import SubscriptionAlertButton from "../SubscriptionAlertButton";
import { OrganizationTypes } from "@/constants/Types";

interface Props {
  location: string;
  organization: OrganizationTypes;
}

const ProjectTable = ({ location, organization }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { projects } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const rowOnCLick = (slug: string) => router.push(`project/${slug}`);

  return (
    <div className=" text-sm pb-5 ">
      {projects && projects.length > 0 ? (
        <TanStackDataTable
          columns={location === "dashboard" ? columnsDashboard : columns}
          data={projects}
          pageTitle="Projects"
          newButton={
            location === "home" ? null : (
              <SubscriptionAlertButton
                organization={organization}
                validationLength={projects.length}
                subTitle="projects"
                title="Project"
                url="project/create"
              />
            )
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
            <Button>Create Projects</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
