"use client";

import React, { useContext, useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import GroupHeader from "./GroupHeader";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { setActiveChatWithSlug } from "@/app/lib/features/chat/chatSlice";
import { getChats } from "@/app/lib/features/chat/chatActions";
import GroupContainer from "./GroupContainer";
import { UserContext } from "../UserProvider/UserContextProvider";
import { MessageTypes } from "@/constants/Types";

const Group = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();

  const { chats, activeChat } = useAppSelector((state) => state.chat);
  const { socket } = useContext(UserContext);
  const [messages, setMessages] = useState<MessageTypes[]>([]);

  useEffect(() => {
    socket && socket.emit("join-group-chat-room", { slug });
  }, [socket]);

  useEffect(() => {
    if (chats) {
      dispatch(setActiveChatWithSlug({ slug }));
    }
  }, [slug, chats, dispatch]);

  useEffect(() => {
    if (!activeChat) {
      dispatch(setActiveChatWithSlug({ slug }));
    }
  }, [slug, activeChat, dispatch]);

  useEffect(() => {
    if (!chats || chats.length === 0) {
      dispatch(getChats({ filter: "" }));
    }
  }, [chats, dispatch]);

  return (
    <>
      {/* Group Header */}
      <GroupHeader slug={slug} />
      {/* Group Section */}
      <div className="flex flex-col justify-between h-[89vh]">
        <GroupContainer messages={messages} setMessages={setMessages} />
        <MessageBox setMessages={setMessages} />
      </div>
    </>
  );
};

export default Group;
