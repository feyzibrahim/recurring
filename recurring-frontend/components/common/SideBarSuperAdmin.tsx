"use client";
import Image from "next/image";
import Recurring from "./Recurring";
import Logo from "../../public/img/logo.png";
import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiCreditCard, BiLogOut } from "react-icons/bi";
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
import { CgOrganisation } from "react-icons/cg";

const SideBarSuperAdmin = () => {
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
        <Link href={"/super-admin"} className="hover-text text-xl">
          <ToolTipWrapper title="Dashboard">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/super-admin" ? " bg-primary text-white" : ""
              }`}
            >
              <AiOutlineDashboard className="m-1" />
            </div>
          </ToolTipWrapper>
        </Link>
        <Link
          href={"/super-admin/organizations"}
          className="hover-text text-xl"
        >
          <ToolTipWrapper title="Organizations">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/organizations")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <CgOrganisation className="m-1" />
            </div>
          </ToolTipWrapper>
        </Link>

        <ToolTipWrapper title="Users">
          <Link href={"/super-admin/users"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/super-admin/users")
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <IoIosPeople className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Subscriptions">
          <Link
            href={"/super-admin/subscriptions"}
            className="hover-text text-xl"
          >
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName === "/super-admin/subscriptions"
                  ? " bg-primary text-white"
                  : ""
              }`}
            >
              <BiCreditCard className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Settings">
          <Link href={"/super-admin/settings"} className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-background ${
                pathName.includes("/super-admin/settings")
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

export default SideBarSuperAdmin;
