"use client";
import { setActiveChat } from "@/app/lib/features/chat/chatSlice";
import { useAppDispatch } from "@/app/lib/hook";
import UserAvatar from "@/components/common/UserAvatar";
import { ChatTypes, EmployeeTypes } from "@/constants/Types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface PropsTypes {
  user: EmployeeTypes;
  chat: ChatTypes;
}

const SingleChat = ({ user, chat }: PropsTypes) => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  let path = pathName.split("/");
  let curr = path[1];

  const handleChatClick = () => {
    dispatch(setActiveChat({ chat }));
  };

  return (
    <Link
      href={`/${curr}/chat/user/${user.username}`}
      onClick={handleChatClick}
    >
      <div className="hover:bg-backgroundAccent flex gap-2 items-center text-sm rounded-sm p-1 cursor-pointer">
        <UserAvatar
          profileImageURL={
            typeof user.profileImageURL === "string" ? user.profileImageURL : ""
          }
        />
        <div>
          <h4>
            {user.firstName} {user.lastName}
          </h4>
          <p className="text-xs">@{user.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleChat;
