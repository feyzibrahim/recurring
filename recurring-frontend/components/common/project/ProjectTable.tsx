"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect, useState } from "react";
import { getProjects } from "@/app/lib/features/project/projectActions";
import { useRouter } from "next/navigation";
import { TanStackDataTable } from "@/components/custom/TanStackDataTable";
import { columns, columnsDashboard } from "./projectColumns";
import EmptyFolder from "@/components/empty/EmptyFolder";
import SubscriptionAlertButton from "../SubscriptionAlertButton";
import { OrganizationTypes } from "@/constants/Types";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

interface Props {
  location: string;
}

const ProjectTable = ({ location }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [organization, setOrganization] = useState<OrganizationTypes>();

  const { projects } = useAppSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      const data = await actualCommonRequest({
        route: API_ROUTES.AUTH,
        method: "GET",
        url: "/api/user/organization",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setOrganization(data.organization);
    };

    loadData();
  }, []);

  const rowOnCLick = (slug: string) => router.push(`project/${slug}`);

  return (
    <div className=" text-sm pb-5 ">
      {projects && organization && projects.length > 0 ? (
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
