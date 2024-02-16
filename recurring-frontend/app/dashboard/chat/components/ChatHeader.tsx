"use client";
import { useAppSelector } from "@/app/lib/hook";
import UserAvatar from "@/components/common/UserAvatar";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface PropsTypes {
  socket: Socket;
}

const ChatHeader = ({ socket }: PropsTypes) => {
  const [typing, setTyping] = useState(false);
  const [handler, setHandler] = useState("");

  const { activeChat } = useAppSelector((state) => state.chat);

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
      {activeChat && (
        <UserAvatar
          profileImageURL={
            typeof activeChat.participants[0].profileImageURL === "string"
              ? activeChat.participants[0].profileImageURL
              : ""
          }
        />
      )}
      <div className="w-full">
        {activeChat &&
          `${activeChat.participants[0].firstName} ${activeChat.participants[0].lastName}`}
        {typing && <p>{handler} is typing...</p>}
      </div>
    </div>
  );
};

export default ChatHeader;
