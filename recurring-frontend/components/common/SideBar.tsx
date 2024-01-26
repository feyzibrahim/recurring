"use client";
import Image from "next/image";
import Recurring from "./Recurring";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { CgTimelapse } from "react-icons/cg";
import { FaMoneyCheckAlt, FaRegAddressCard, FaTasks } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { BiChat, BiCreditCard, BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { commonRequest } from "@/api/client";
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

const SideBar = async () => {
  const pathName = usePathname();
  const router = useRouter();

  const logoutUser = async () => {
    const data = await commonRequest({
      method: "GET",
      url: "/user/logout",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("SideBar: logoutUser -> data", data);
    if (data.success) {
      router.push("/");
    }
  };

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
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard" ? " bg-primary text-white" : ""
            }`}
          >
            <AiOutlineDashboard className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/project"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/project" ? " bg-primary text-white" : ""
            }`}
          >
            <RiDashboardLine className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/timeline"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/timeline" ? " bg-primary text-white" : ""
            }`}
          >
            <CgTimelapse className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/task"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/task" ? " bg-primary text-white" : ""
            }`}
          >
            <FaTasks className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/employee"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/employee" ? " bg-primary text-white" : ""
            }`}
          >
            <FaRegAddressCard className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/billing"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/billing" ? " bg-primary text-white" : ""
            }`}
          >
            <BiCreditCard className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/clients"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/clients" ? " bg-primary text-white" : ""
            }`}
          >
            <IoIosPeople className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/deals"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/deals" ? " bg-primary text-white" : ""
            }`}
          >
            <FaMoneyCheckAlt className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/chat"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/chat" ? " bg-primary text-white" : ""
            }`}
          >
            <BiChat className="m-1" />
          </div>
        </Link>
        <Link href={"/dashboard/settings"} className="hover-text text-xl">
          <div
            className={`p-1 rounded-xl hover:bg-background ${
              pathName === "/dashboard/settings" ? " bg-primary text-white" : ""
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
              <AlertDialogAction onClick={() => logoutUser()}>
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
