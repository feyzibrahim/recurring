"use client";

import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { Socket, io } from "socket.io-client";
import { API_ROUTES } from "@/lib/routes";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  let [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    let connect: Socket = io(API_ROUTES.CHAT);
    setSocket(connect);
  }, []);

  return (
    <>
      {/* Chat Header */}
      {socket && <ChatHeader socket={socket} />}
      {/* Chat Section */}
      <div className="flex flex-col justify-between h-[89vh]">
        {socket && <ChatContainer socket={socket} />}
        {socket && <MessageBox socket={socket} />}
      </div>
    </>
  );
};

export default Chat;
