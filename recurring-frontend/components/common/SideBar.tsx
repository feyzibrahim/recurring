"use client";
import Image from "next/image";
import Recurring from "./Recurring";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { FaMoneyCheckAlt, FaRegAddressCard, FaTasks } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BiCalendar, BiChat, BiCreditCard, BiLogOut } from "react-icons/bi";
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

const SideBar = () => {
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
        <Link href={"/dashboard"} className="hover-text text-xl">
          <ToolTipWrapper title="Dashboard">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/dashboard" ? " bg-primary text-white" : ""
              }`}
            >
              <AiOutlineDashboard className="m-1" />
            </div>
          </ToolTipWrapper>
        </Link>
        <Link href={"/dashboard/project"} className="hover-text text-xl">
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
        {/* <ToolTipWrapper title="Timeline">
          <Link href={"/dashboard/timeline"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/dashboard/timeline"
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <CgTimelapse className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper> */}

        <ToolTipWrapper title="Task">
          <Link href={"/dashboard/task"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/dashboard/task" ? " bg-primary text-white" : ""
              }`}
            >
              <FaTasks className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Employee">
          <Link href={"/dashboard/employee"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/employee") ? " bg-primary text-white" : ""
              }`}
            >
              <FaRegAddressCard className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Clients">
          <Link href={"/dashboard/clients"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/dashboard/clients")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <IoIosPeople className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Deals">
          <Link href={"/dashboard/deals"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/dashboard/deals")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <FaMoneyCheckAlt className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Chat">
          <Link href={"/dashboard/chat"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/dashboard/chat")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <BiChat className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>
        <ToolTipWrapper title="Meetings">
          <Link href={"/dashboard/meetings"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/dashboard/meetings")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <BiCalendar className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Settings">
          <Link href={"/dashboard/settings"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/dashboard/settings")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <FiSettings className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Billing">
          <Link href={"/dashboard/billing"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/dashboard/billing"
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <BiCreditCard className="m-1" />
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

export default SideBar;
