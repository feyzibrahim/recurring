"use client";
import Image from "next/image";
import Recurring from "./Recurring";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { CgTimelapse } from "react-icons/cg";
import { FaMoneyCheckAlt, FaRegAddressCard, FaTasks } from "react-icons/fa";
import { BiCalendar, BiChat, BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { logout } from "@/client/logout";
import { ToolTipWrapper } from "../custom/ToolTipWrapper";

const ManagerSideBar = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="bg-backgroundAccent p-2 hidden md:block text-center h-screen">
      <div className="flex flex-col items-center gap-2 pt-4">
        <Image alt="recurring" src={Logo} width={25} height={25} />
        <h1 className="font-bold text-xs">
          <Recurring />
        </h1>
      </div>
      <div className="flex flex-col items-center gap-3 py-5">
        <Link href={"/man"} className="hover-text text-xl">
          <ToolTipWrapper title="Dashboard">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/man" ? " bg-primary text-white" : ""
              }`}
            >
              <AiOutlineDashboard className="m-1" />
            </div>
          </ToolTipWrapper>
        </Link>
        <Link href={"/man/project"} className="hover-text text-xl">
          <ToolTipWrapper title="Project">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/project") ? " bg-primary text-white" : ""
              }`}
            >
              <RiDashboardLine className="m-1" />
            </div>
          </ToolTipWrapper>
        </Link>
        <ToolTipWrapper title="Timeline">
          <Link href={"/man/timeline"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/man/timeline" ? " bg-primary text-white" : ""
              }`}
            >
              <CgTimelapse className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Task">
          <Link href={"/man/task"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/man/task" ? " bg-primary text-white" : ""
              }`}
            >
              <FaTasks className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Employee">
          <Link href={"/man/employee"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/employee") ? " bg-primary text-white" : ""
              }`}
            >
              <FaRegAddressCard className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>
        <ToolTipWrapper title="Deals">
          <Link href={"/man/deals"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/man/deals" ? " bg-primary text-white" : ""
              }`}
            >
              <FaMoneyCheckAlt className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Chat">
          <Link href={"/man/chat"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/man/chat") ? " bg-primary text-white" : ""
              }`}
            >
              <BiChat className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>
        <ToolTipWrapper title="Meetings">
          <Link href={"/man/meetings"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/man/meetings")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <BiCalendar className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Settings">
          <Link href={"/man/settings"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/man/settings")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <FiSettings className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              className={`p-1 rounded-xl hover:bg-background text-xl hover-text`}
            >
              <BiLogOut className="m-1" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                You will have to login again to access <Recurring /> again. You
                can close the window without logging out!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction onClick={() => logout(router)}>
                Yes!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ManagerSideBar;
