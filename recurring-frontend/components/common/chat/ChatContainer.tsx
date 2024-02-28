"use client";
import { useContext, useEffect, useRef, useState } from "react";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import { useAppSelector } from "@/app/lib/hook";
import { UserContext } from "./UserProvider/UserContextProvider";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import EmptyMessage from "@/components/empty/EmptyMessage";
import { MessageTypes } from "@/constants/Types";

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
    const loadData = async () => {
      if (activeChat) {
        const res = await actualCommonRequest({
          route: API_ROUTES.CHAT,
          url: `/api/message/${activeChat?._id}`,
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        if (res.messages) {
          setMessages(res.messages);
        }
      }
    };
    loadData();
  }, [activeChat]);

  useEffect(() => {
    socket &&
      socket.off("message").on("message", (data) => {
        if (
          activeChat?.participants.find((part) => part._id !== user?._id)
            ?._id === data.from ||
          activeChat?.participants.find((part) => part._id === user?._id)
            ?._id === data.from
        ) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      });
  }, [socket, activeChat, user]);

  return (
    <div
      className="px-5 w-full h-full pb-2 text-sm overflow-auto scrollbar-hide"
      ref={scrollAreaRef}
    >
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => {
          if (msg.from === user?._id) {
            return <MyChat message={msg} key={index} />;
          } else {
            return <OtherChat message={msg} key={index} />;
          }
        })
      ) : (
        <div className="flex items-center justify-center h-full text-center">
          <div>
            <EmptyMessage />
            <p className="py-2">No Message yet</p>
            <p className="text-xs text-foregroundAccent">
              Be the first to send a message!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
