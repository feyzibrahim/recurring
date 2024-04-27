"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNav = () => {
  const pathName = usePathname();
  let path = pathName.split("/");
  let curr = path[1];

  return (
    <div className="flex gap-8 text-foregroundAccent text-sm overflow-x-auto">
      <Link
        href={`/${curr}/settings`}
        className={`shrink-0 pb-2 ${
          pathName === `/${curr}/settings` ? "text-foreground font-bold" : ""
        }`}
      >
        Profile
      </Link>
      <Link
        href={`/${curr}/settings/organization`}
        className={` ${
          pathName === `/${curr}/settings/organization`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Organization
      </Link>
      <Link
        href={`/${curr}/settings/password`}
        className={` ${
          pathName === `/${curr}/settings/password`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Password
      </Link>
      <Link
        href={`/${curr}/settings/theme`}
        className={` ${
          pathName === `/${curr}/settings/theme`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Theme
      </Link>
      <Link
        href={`/${curr}/settings/email`}
        className={` ${
          pathName === `/${curr}/settings/email`
            ? "text-foreground font-bold"
            : ""
        }`}
      >
        Email
      </Link>
      <Link
        href={`/${curr}/settings/notification`}
        className={` ${
          pathName === `/${curr}/settings/notification`
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
