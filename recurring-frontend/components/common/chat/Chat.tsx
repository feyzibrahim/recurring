"use client";

import React, { useContext } from "react";
import MessageBox from "./MessageBox";

import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import { UserContext } from "./UserProvider/UserContextProvider";

const Chat = () => {
  const { user, socket } = useContext(UserContext);

  return (
    <>
      {/* Chat Header */}
      {socket && user && <ChatHeader socket={socket} user={user} />}
      {/* Chat Section */}
      <div className="flex flex-col justify-between h-[89vh]">
        <ChatContainer />
        <MessageBox />
      </div>
    </>
  );
};

export default Chat;
