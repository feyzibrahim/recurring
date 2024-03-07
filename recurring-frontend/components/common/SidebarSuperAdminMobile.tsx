"use client";

import Image from "next/image";
import Recurring from "./Recurring";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiCreditCard, BiLogOut, BiMenu } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/client/logout";
import { ToolTipWrapper } from "../custom/ToolTipWrapper";
import { CgOrganisation } from "react-icons/cg";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

const SideBarSuperAdminMobile = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="md:hidden text-2xl w-full bg-backgroundAccent py-2 flex justify-end px-5">
          <BiMenu />
        </div>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-3 py-5">
          <SheetClose asChild>
            <Link href={"/super-admin"} className="hover-text text-xl">
              <ToolTipWrapper title="Dashboard">
                <div
                  className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                    pathName === "/super-admin" ? " bg-primary text-white" : ""
                  }`}
                >
                  <AiOutlineDashboard className="m-1" />
                  <span>Dashboard</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/super-admin/organizations"}
              className="hover-text text-xl"
            >
              <ToolTipWrapper title="Organizations">
                <div
                  className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                    pathName.includes("/organizations")
                      ? " bg-primary text-white"
                      : ""
                  }`}
                >
                  <CgOrganisation className="m-1" />
                  <span>Organizations</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/super-admin/users"} className="hover-text text-xl">
              <ToolTipWrapper title="Users">
                <div
                  className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                    pathName.includes("/super-admin/users")
                      ? " bg-primary text-white"
                      : ""
                  }`}
                >
                  <IoIosPeople className="m-1" />
                  <span>Users</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href={"/super-admin/subscriptions"}
              className="hover-text text-xl"
            >
              <ToolTipWrapper title="Subscriptions">
                <div
                  className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                    pathName === "/super-admin/subscriptions"
                      ? " bg-primary text-white"
                      : ""
                  }`}
                >
                  <BiCreditCard className="m-1" />
                  <span>Subscriptions</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/super-admin/settings"} className="hover-text text-xl">
              <ToolTipWrapper title="Settings">
                <div
                  className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                    pathName.includes("/super-admin/settings")
                      ? " bg-primary text-white"
                      : ""
                  }`}
                >
                  <FiSettings className="m-1" />
                  <span>Settings</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <div
              className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 text-xl hover-text`}
              onClick={() => logout(router)}
            >
              <BiLogOut className="m-1" />
              <span>Logout</span>
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarSuperAdminMobile;
