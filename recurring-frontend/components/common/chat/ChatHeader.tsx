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

  const { activeChat } = useAppSelector((state) => state.chat);

  useEffect(() => {
    socket &&
      socket.on("typing", (data) => {
        if (data.to === user?._id) {
          setTyping(true);
        }
      });
    socket &&
      socket.on("typing-stopped", (data) => {
        if (data.to === user?._id) {
          setTyping(false);
        }
      });
  }, [socket, user?._id]);

  useEffect(() => {
    socket &&
      socket.on("chat", (data) => {
        setTyping(false);
      });
  }, [socket]);

  useEffect(() => {
    if (typing) {
      setTimeout(() => setTyping(false), 3000);
    }
  }, [typing]);

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
        {activeChat && activeChat.online ? (
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            {typing ? (
              <p className="text-xs animate-pulse">typing...</p>
            ) : (
              <p>Online</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-red-600"></div>
            <p>Offline</p>
          </div>
        )}
      </div>
      <Link href={`${username}/video`}>
        <AiOutlineVideoCameraAdd className="text-2xl hover:text-foregroundAccent cursor-pointer" />
      </Link>
    </div>
  );
};

export default ChatHeader;
