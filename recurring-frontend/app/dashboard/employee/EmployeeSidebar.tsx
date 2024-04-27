"use client";
import { actualCommonRequest } from "@/api/actual_client";
import { useAppSelector } from "@/app/lib/hook";
import SubscriptionAlertButton from "@/components/common/SubscriptionAlertButton";
import { OrganizationTypes } from "@/constants/Types";
import { API_ROUTES } from "@/lib/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CgNotifications } from "react-icons/cg";
import { GrList } from "react-icons/gr";
import { RiDraftLine, RiFolderUserLine } from "react-icons/ri";

const EmployeeSidebar = () => {
  const { employees } = useAppSelector((state) => state.employee);
  const pathName = usePathname();

  const [organization, setOrganization] = useState<OrganizationTypes>();

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
      if (data.success) {
        setOrganization(data.organization);
      }
    };
    loadData();
  }, []);

  return (
    <div className="p-5 bg-secondary pt-16">
      <h1 className="text-2xl font-bold pr-5">Employees</h1>
      <div className="flex flex-col gap-2 my-5 text-sm">
        <Link href={"/dashboard/employee"} className="hover-text w-full">
          <div
            className={`px-3 py-2 rounded flex items-center gap-1 ${
              pathName === "/dashboard/employee"
                ? " bg-backgroundAccent text-foregroundAccent"
                : ""
            }`}
          >
            <GrList /> Employee List
          </div>
        </Link>
        {employees && organization && (
          <SubscriptionAlertButton
            organization={organization}
            validationLength={employees.length}
            subTitle="employees"
            title="Employee"
            url="employee/create"
            variant="ghost"
            activeButton={
              <Link href={"/dashboard/employee/create"} className="hover-text">
                <div
                  className={`px-3 py-2 rounded flex items-center gap-1 ${
                    pathName === "/dashboard/employee/create"
                      ? " bg-backgroundAccent text-foregroundAccent"
                      : ""
                  }`}
                >
                  <AiOutlineUserAdd /> Create
                </div>
              </Link>
            }
            nonActiveButton={
              <div
                className={`px-3 py-2 rounded flex items-center gap-1 hover-text ${
                  pathName === "/dashboard/employee/create"
                    ? " bg-backgroundAccent text-foregroundAccent"
                    : ""
                }`}
              >
                <AiOutlineUserAdd /> Create
              </div>
            }
          />
        )}
        <Link
          href={"/dashboard/employee/leave-requests"}
          className="hover-text"
        >
          <div
            className={`px-3 py-2 rounded flex items-center gap-1 ${
              pathName === "/dashboard/employee/leave-requests"
                ? " bg-backgroundAccent text-foregroundAccent"
                : ""
            }`}
          >
            <CgNotifications /> Leave Requests
          </div>
        </Link>
        <Link href={"/dashboard/employee/ex"} className="hover-text">
          <div
            className={`px-3 py-2 rounded flex items-center gap-1 ${
              pathName === "/dashboard/employee/ex"
                ? " bg-backgroundAccent text-foregroundAccent"
                : ""
            }`}
          >
            <RiFolderUserLine /> Ex-employees
          </div>
        </Link>
        {/* <Link href={"/dashboard/employee/leave-policy"} className="hover-text">
          <div
            className={`px-3 py-2 rounded flex items-center gap-1 ${
              pathName === "/dashboard/employee/leave-policy"
                ? " bg-backgroundAccent text-foregroundAccent"
                : ""
            }`}
          >
            <RiDraftLine /> Leave Policy
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default EmployeeSidebar;
