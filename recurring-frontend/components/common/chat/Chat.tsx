"use client";

import React from "react";
import MessageBox from "./MessageBox";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";

const Chat = ({ username }: { username: string }) => {
  console.log("file: Chat.tsx:9 -> Chat -> username", username);
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
