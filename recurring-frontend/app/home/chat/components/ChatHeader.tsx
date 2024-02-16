"use client";
import { useAppSelector } from "@/app/lib/hook";
import AvatarFallbackImage from "@/components/common/AvatarFallbackImage";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface PropsTypes {
  socket: Socket;
}

const ChatHeader = ({ socket }: PropsTypes) => {
  const [typing, setTyping] = useState(false);
  const [handler, setHandler] = useState("");

  const { activeChatUser } = useAppSelector((state) => state.chat);

  useEffect(() => {
    socket.on("typing", (data) => {
      console.log("file: ChatHeader.tsx:17 -> socket.on -> data", data);
      setTyping(true);
      setHandler(data.handle);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("chat", (data) => {
      setTyping(false);
      setHandler("");
    });
  }, [socket]);

  return (
    <div className="flex gap-2 items-center shadow-md p-5 ">
      <Avatar>
        <AvatarImage
          src={
            typeof activeChatUser?.profileImageURL === "string"
              ? activeChatUser.profileImageURL
              : ""
          }
        />
        <AvatarFallbackImage />
      </Avatar>
      <div className="w-full">
        {activeChatUser &&
          `${activeChatUser.firstName} ${activeChatUser.lastName}`}
        {typing && <p>{handler} is typing...</p>}
      </div>
    </div>
  );
};

export default ChatHeader;
