"use client";

import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { CgTimelapse } from "react-icons/cg";
import { FaRegAddressCard, FaTasks } from "react-icons/fa";
import { BiCalendar, BiChat, BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { logout } from "@/client/logout";
import { useRouter } from "next/navigation";

const SidebarManagerMobile = () => {
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
            <Link href={"/man"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName === "/man" ? " bg-primary text-white" : ""
                }`}
              >
                <AiOutlineDashboard className="m-1" />
                <span>Dashboard</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/man/project"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/project") ? " bg-primary text-white" : ""
                }`}
              >
                <RiDashboardLine className="m-1" />
                <span>Project</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/man/timeline"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName === "/man/timeline" ? " bg-primary text-white" : ""
                }`}
              >
                <CgTimelapse className="m-1" />
                <span>Timeline</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/man/task"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName === "/man/task" ? " bg-primary text-white" : ""
                }`}
              >
                <FaTasks className="m-1" />
                <span>Task</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/man/employee"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/employee") ? " bg-primary text-white" : ""
                }`}
              >
                <FaRegAddressCard className="m-1" />
                <span>Employee</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/man/chat"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/man/chat") ? " bg-primary text-white" : ""
                }`}
              >
                <BiChat className="m-1" />
                <span>Chat</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/man/meetings"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/man/meetings")
                    ? " bg-primary text-white"
                    : ""
                }`}
              >
                <BiCalendar className="m-1" />
                <span>Meetings</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/man/settings"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/man/settings")
                    ? " bg-primary text-white"
                    : ""
                }`}
              >
                <FiSettings className="m-1" />
                <span>Settings</span>
              </div>
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

export default SidebarManagerMobile;
