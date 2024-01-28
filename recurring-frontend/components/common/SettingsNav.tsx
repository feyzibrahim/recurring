"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNav = () => {
  const pathName = usePathname();

  return (
    <div className="flex gap-8 text-foregroundAccent text-sm overflow-x-auto">
      <Link
        href="/dashboard/settings"
        className={`shrink-0 pb-2 ${
          pathName === "/dashboard/settings" ? "text-foreground font-bold" : ""
        }`}
      >
        My Details
      </Link>
      <Link
        href="/dashboard/settings/profile"
        className={` ${
          pathName === "/dashboard/settings/profile"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Profile
      </Link>
      <Link
        href="/dashboard/settings/password"
        className={` ${
          pathName === "/dashboard/settings/password"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Password
      </Link>
      <Link
        href="/dashboard/settings/theme"
        className={` ${
          pathName === "/dashboard/settings/theme"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Theme
      </Link>
      <Link
        href="/dashboard/settings/plan"
        className={` ${
          pathName === "/dashboard/settings/plan"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Plan
      </Link>
      <Link
        href="/dashboard/settings/billing"
        className={` ${
          pathName === "/dashboard/settings/billing"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Billing
      </Link>
      <Link
        href="/dashboard/settings/email"
        className={` ${
          pathName === "/dashboard/settings/email"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Email
      </Link>
      <Link
        href="/dashboard/settings/notification"
        className={` ${
          pathName === "/dashboard/settings/notification"
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Notification
      </Link>
    </div>
  );
};

export default SettingsNav;
