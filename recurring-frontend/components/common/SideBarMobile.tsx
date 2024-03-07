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
import { FaMoneyCheckAlt, FaRegAddressCard, FaTasks } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BiCalendar, BiChat, BiCreditCard, BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

const SideBarMobile = () => {
  const pathName = usePathname();

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
            <Link href={"/dashboard"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName === "/dashboard" ? " bg-primary text-white" : ""
                }`}
              >
                <AiOutlineDashboard className="m-1" />
                <span>Dashboard</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/dashboard/project"} className="hover-text text-xl">
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
            <Link href={"/dashboard/task"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName === "/dashboard/task" ? " bg-primary text-white" : ""
                }`}
              >
                <FaTasks className="m-1" />
                <span>Task</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/dashboard/employee"} className="hover-text text-xl">
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
            <Link href={"/dashboard/clients"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/dashboard/clients")
                    ? " bg-primary text-white"
                    : ""
                }`}
              >
                <IoIosPeople className="m-1" />
                <span>Clients</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/dashboard/deals"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/dashboard/deals")
                    ? " bg-primary text-white"
                    : ""
                }`}
              >
                <FaMoneyCheckAlt className="m-1" />
                <span>Deals</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/dashboard/chat"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/dashboard/chat")
                    ? " bg-primary text-white"
                    : ""
                }`}
              >
                <BiChat className="m-1" />
                <span>Chat</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={"/dashboard/meetings"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/dashboard/meetings")
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
            <Link href={"/dashboard/settings"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName.includes("/dashboard/settings")
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
            <Link href={"/dashboard/billing"} className="hover-text text-xl">
              <div
                className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 ${
                  pathName === "/dashboard/billing"
                    ? " bg-primary text-white"
                    : ""
                }`}
              >
                <BiCreditCard className="m-1" />
                <span>Billing</span>
              </div>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <div
              className={`p-1 rounded-xl hover:bg-background flex items-center gap-1 text-xl hover-text`}
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

export default SideBarMobile;
