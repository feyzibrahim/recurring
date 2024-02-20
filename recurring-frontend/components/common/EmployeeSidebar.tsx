"use client";
import Image from "next/image";
import Recurring from "./Recurring";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { CgTimelapse } from "react-icons/cg";
import { FaRegAddressCard, FaTasks } from "react-icons/fa";
import { BiChat, BiCreditCard, BiLogOut } from "react-icons/bi";
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

const EmployeeSidebar = () => {
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
        <Link href={"/home"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/home" ? " bg-primary text-white" : ""
            }`}
          >
            <AiOutlineDashboard className="m-1" />
          </div>
        </Link>
        <Link href={"/home/project"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName.includes("/project") ? " bg-primary text-white" : ""
            }`}
          >
            <RiDashboardLine className="m-1" />
          </div>
        </Link>
        <Link href={"/home/timeline"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/home/timeline" ? " bg-primary text-white" : ""
            }`}
          >
            <CgTimelapse className="m-1" />
          </div>
        </Link>
        <Link href={"/home/task"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/home/task" ? " bg-primary text-white" : ""
            }`}
          >
            <FaTasks className="m-1" />
          </div>
        </Link>
        <Link href={"/home/employee"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName.includes("/employee") ? " bg-primary text-white" : ""
            }`}
          >
            <FaRegAddressCard className="m-1" />
          </div>
        </Link>
        <Link href={"/home/billing"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/home/billing" ? " bg-primary text-white" : ""
            }`}
          >
            <BiCreditCard className="m-1" />
          </div>
        </Link>

        <Link href={"/home/chat"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/home/chat" ? " bg-primary text-white" : ""
            }`}
          >
            <BiChat className="m-1" />
          </div>
        </Link>
        <Link href={"/home/settings"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName.includes("/home/settings")
                ? " bg-primary text-white"
                : ""
            }`}
          >
            <FiSettings className="m-1" />
          </div>
        </Link>

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

export default EmployeeSidebar;
