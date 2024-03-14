"use client";
import UserAvatar from "@/components/common/UserAvatar";
import { EmployeeTypes } from "@/constants/Types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface PropsTypes {
  user: EmployeeTypes;
  online: boolean;
}

const SingleChat = ({ user, online }: PropsTypes) => {
  console.log("file: SingleChat.tsx:14 -> SingleChat -> user", user);
  const pathName = usePathname();
  let path = pathName.split("/");
  let curr = path[1];

  if (!user) {
    return <div>Single chat</div>;
  }

  return (
    <Link href={`/${curr}/chat/user/${user.username}`}>
      <div className="hover:bg-backgroundAccent flex gap-2 items-center text-sm rounded-sm p-1 cursor-pointer relative">
        <UserAvatar
          profileImageURL={
            typeof user.profileImageURL === "string" ? user.profileImageURL : ""
          }
        />
        <div>
          <h4 className="line-clamp-1">
            {user.firstName} {user.lastName}
          </h4>
          <p className="text-xs line-clamp-1">@{user.username}</p>
        </div>
        {online && (
          <div className="w-2 h-2 border border-foreground rounded-full absolute bg-green-600 bottom-1 left-9"></div>
        )}
      </div>
    </Link>
  );
};

export default SingleChat;
