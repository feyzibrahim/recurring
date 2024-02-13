"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNavHome = () => {
  const pathName = usePathname();

  return (
    <div className="flex gap-8 text-foregroundAccent text-sm overflow-x-auto">
      <Link
        href="/home/settings"
        className={`shrink-0 pb-2 ${
          pathName === "/home/settings" ? "text-foreground font-bold" : ""
        }`}
      >
        Profile
      </Link>
      <Link
        href="/home/settings/organization"
        className={` ${
          pathName === "/home/settings/organization"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Organization
      </Link>
      <Link
        href="/home/settings/password"
        className={` ${
          pathName === "/home/settings/password"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Password
      </Link>
      <Link
        href="/home/settings/theme"
        className={` ${
          pathName === "/home/settings/theme" ? "text-foreground font-bold" : ""
        }`}
      >
        Theme
      </Link>
      <Link
        href="/home/settings/plan"
        className={` ${
          pathName === "/home/settings/plan" ? "text-foreground font-bold" : ""
        }`}
      >
        Plan
      </Link>
      <Link
        href="/home/settings/email"
        className={` ${
          pathName === "/home/settings/email" ? "text-foreground font-bold" : ""
        }`}
      >
        Email
      </Link>
      <Link
        href="/home/settings/notification"
        className={` ${
          pathName === "/home/settings/notification"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Notification
      </Link>
    </div>
  );
};

export default SettingsNavHome;
