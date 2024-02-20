"use client";
import { useAppSelector } from "@/app/lib/hook";
import UserAvatar from "@/components/common/UserAvatar";
import { ChatTypes, EmployeeTypes } from "@/constants/Types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider/UserContextProvider";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import Link from "next/link";

const ChatHeader = ({ username }: { username: string }) => {
  const { user, socket } = useContext(UserContext);

  const [typing, setTyping] = useState(false);
  const [handler, setHandler] = useState("");

  const { activeChat } = useAppSelector((state) => state.chat);

  useEffect(() => {
    socket &&
      socket.on("typing", (data) => {
        console.log("file: ChatHeader.tsx:17 -> socket.on -> data", data);
        setTyping(true);
        setHandler(data.handle);
      });
  }, [socket]);

  useEffect(() => {
    socket &&
      socket.on("chat", (data) => {
        setTyping(false);
        setHandler("");
      });
  }, [socket]);

  const getCurrentUser = (chat: ChatTypes) => {
    let temp = chat.participants.find(
      (part) => part.username !== user?.username
    );

    return temp as EmployeeTypes;
  };

  return (
    <div className="flex gap-2 items-center shadow-md p-5 ">
      {activeChat && (
        <UserAvatar
          profileImageURL={getCurrentUser(activeChat).profileImageURL as string}
        />
      )}
      <div className="w-full">
        {activeChat &&
          `${getCurrentUser(activeChat).firstName} ${
            getCurrentUser(activeChat).lastName
          }`}
        {typing && <p>{handler} is typing...</p>}
      </div>
      <Link href={`${username}/video`}>
        <AiOutlineVideoCameraAdd className="text-2xl hover:text-foregroundAccent cursor-pointer" />
      </Link>
    </div>
  );
};

export default ChatHeader;
