"use client";
import { useAppSelector } from "@/app/lib/hook";
import UserAvatar from "@/components/common/UserAvatar";
import { ChatTypes, EmployeeTypes } from "@/constants/Types";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface PropsTypes {
  socket: Socket;
  user: EmployeeTypes;
}

const ChatHeader = ({ socket, user }: PropsTypes) => {
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

  const getCurrentUser = (chat: ChatTypes) => {
    let temp = chat.participants.find(
      (part) => part.username !== user.username
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
    </div>
  );
};

export default ChatHeader;
