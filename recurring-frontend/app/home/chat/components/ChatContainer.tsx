"use client";
import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import { useAppSelector } from "@/app/lib/hook";

interface PropsTypes {
  socket: Socket;
}

interface MessageTypes {
  message: string;
  handle: string;
}

const ChatContainer = ({ socket }: PropsTypes) => {
  const [messages, setMessages] = useState<MessageTypes[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { activeChatUser } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.on("chat", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  return (
    <div
      className="px-5 w-full h-full \ text-sm overflow-auto scrollbar-hide"
      ref={scrollAreaRef}
    >
      {messages &&
        messages.map((msg, index) => {
          if (msg.handle === activeChatUser?.username) {
            return <MyChat message={msg.message} key={index} />;
          } else {
            return (
              <OtherChat
                message={msg.message}
                handler={msg.handle}
                key={index}
              />
            );
          }
        })}
    </div>
  );
};

export default ChatContainer;
