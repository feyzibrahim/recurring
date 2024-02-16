"use client";
import { useAppSelector } from "@/app/lib/hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { Socket } from "socket.io-client";

interface PropsTypes {
  socket: Socket;
}

const MessageBox = ({ socket }: PropsTypes) => {
  const [message, setMessage] = useState("");
  const { activeChatUser } = useAppSelector((state) => state.chat);

  const handleMessageSent = () => {
    if (message.trim() !== "") {
      socket.emit("chat", {
        message: message,
        handle: activeChatUser?.username,
      });
      setMessage("");
    }
  };
  const typingBroadcast = () => {
    socket.emit("typing", { handle: activeChatUser?.username });
  };

  return (
    <div className="bg-backgroundAccent px-5 py-5 relative">
      <div>
        <Input
          className="rounded-full"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            typingBroadcast();
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              handleMessageSent();
            }
          }}
        />
      </div>
      <Button
        className="rounded-full absolute top-5 right-5 text-xl"
        onClick={handleMessageSent}
      >
        <FiSend />
      </Button>
    </div>
  );
};

export default MessageBox;
