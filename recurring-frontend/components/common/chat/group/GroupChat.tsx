"use client";
import UserAvatar from "@/components/common/UserAvatar";
import { ChatTypes } from "@/constants/Types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface PropsTypes {
  chat: ChatTypes;
  online: boolean;
}

const GroupChat = ({ chat, online }: PropsTypes) => {
  const pathName = usePathname();
  let path = pathName.split("/");
  let curr = path[1];

  return (
    <Link href={`/${curr}/chat/group/${chat.slug}`}>
      <div className="hover:bg-backgroundAccent flex gap-2 items-center text-sm rounded-sm p-1 cursor-pointer relative">
        <UserAvatar profileImageURL={chat.groupProfile as string} />
        <div>
          <h4 className="line-clamp-1">{chat.groupName}</h4>
          {/* <p className="text-xs line-clamp-1">@{user.username}</p> */}
        </div>
        {online && (
          <div className="w-2 h-2 border border-foreground rounded-full absolute bg-green-600 bottom-1 left-9"></div>
        )}
      </div>
    </Link>
  );
};

export default GroupChat;
