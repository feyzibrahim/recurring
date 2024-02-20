"use client";

import React, { useEffect } from "react";
import MessageBox from "./MessageBox";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import { useAppDispatch } from "@/app/lib/hook";
import { setActiveChatWithUserName } from "@/app/lib/features/chat/chatSlice";

const Chat = ({ username }: { username: string }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveChatWithUserName({ username }));
  }, [username]);

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
