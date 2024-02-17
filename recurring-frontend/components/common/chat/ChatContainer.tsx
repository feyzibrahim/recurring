"use client";
import { Socket } from "socket.io-client";
import { useContext, useEffect, useRef, useState } from "react";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import { useAppSelector } from "@/app/lib/hook";
import { UserContext } from "./UserProvider/UserContextProvider";

interface PropsTypes {
  socket: Socket;
}

interface MessageTypes {
  message: string;
  from: string;
  to: string;
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { activeChat } = useAppSelector((state) => state.chat);
  const { user, socket } = useContext(UserContext);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket &&
      socket.on("message", (data) => {
        if (
          activeChat?.participants.find((part) => part._id !== user?._id)
            ?._id === data.from ||
          activeChat?.participants.find((part) => part._id === user?._id)
            ?._id === data.from
        ) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      });
  }, [socket]);

  return (
    <div
      className="px-5 w-full h-full \ text-sm overflow-auto scrollbar-hide"
      ref={scrollAreaRef}
    >
      {messages &&
        messages.map((msg, index) => {
          if (msg.from === user?._id) {
            return <MyChat message={msg.message} key={index} />;
          } else {
            return <OtherChat message={msg.message} key={index} />;
          }
        })}
    </div>
  );
};

export default ChatContainer;
