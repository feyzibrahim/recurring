"use client";

import React from "react";
import MessageBox from "./MessageBox";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <>
      {/* Chat Header */}
      <ChatHeader />
      {/* Chat Section */}
      <div className="flex flex-col justify-between h-[89vh]">
        <ChatContainer />
        <MessageBox />
      </div>
    </>
  );
};

export default Chat;
