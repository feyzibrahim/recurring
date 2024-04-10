"use client";
import { useContext, useEffect, useRef, useState } from "react";
import MyChat from "../MyChat";
import { useAppSelector } from "@/app/lib/hook";
import { UserContext } from "../UserProvider/UserContextProvider";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import EmptyMessage from "@/components/empty/EmptyMessage";
import { MessageTypes } from "@/constants/Types";
import GroupOtherChat from "./GroupOtherChat";

interface Props {
  messages: MessageTypes[];
  setMessages: any;
}

const GroupContainer = ({ messages, setMessages }: Props) => {
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
          url: `/api/message/group/${activeChat?._id}`,
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        if (res.messages) {
          console.log("file: GroupContainer.tsx:44 -> loadData -> res", res);
          setMessages(res.messages);
        }
      }
    };
    loadData();
  }, [activeChat]);

  useEffect(() => {
    socket &&
      socket.on("group-message", (data) => {
        setMessages((prevMessages: MessageTypes[]) => [...prevMessages, data]);
      });
    return () => {
      socket && socket.off("group-message");
    };
  }, [socket, activeChat, user]);

  return (
    <div
      className="px-5 w-full h-full pb-2 text-sm overflow-auto scrollbar-hide"
      ref={scrollAreaRef}
    >
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => {
          if (typeof msg.from !== "string" && msg.from._id === user?._id) {
            return <MyChat message={msg} key={index} />;
          } else {
            return (
              <GroupOtherChat
                message={msg}
                key={index}
                prevMessage={messages[index - 1]}
              />
            );
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

export default GroupContainer;
