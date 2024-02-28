"use client";

import React, { useEffect } from "react";
import MessageBox from "./MessageBox";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { setActiveChatWithUserName } from "@/app/lib/features/chat/chatSlice";
import { getChats } from "@/app/lib/features/chat/chatActions";

const Chat = ({ username }: { username: string }) => {
  const dispatch = useAppDispatch();

  const { chats } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (!chats || chats.length === 0) {
      dispatch(getChats({ filter: "" }));
    }
    if (chats) {
      dispatch(setActiveChatWithUserName({ username }));
    }
  }, [username, chats, dispatch]);

  return (
    <>
      {/* Chat Header */}
      <ChatHeader username={username} />
      {/* Chat Section */}
      <div className="flex flex-col justify-between h-[89vh]">
        <ChatContainer />
        <MessageBox />
      </div>
    </>
  );
};

export default Chat;
