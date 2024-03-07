"use client";
import { useAppSelector } from "@/app/lib/hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { UserContext } from "./UserProvider/UserContextProvider";

const MessageBox = () => {
  const { user, socket } = useContext(UserContext);

  const [message, setMessage] = useState("");
  const { activeChat } = useAppSelector((state) => state.chat);

  const handleMessageSent = () => {
    if (message.trim() !== "") {
      socket &&
        socket.emit("message", {
          message: message,
          from: user?._id,
          to: activeChat?.participants.find((part) => part._id !== user?._id)
            ?._id,
          chat: activeChat?._id,
          type: "text",
          fromName: `${user?.firstName} ${user?.lastName}`,
        });
      setMessage("");
      typingStoppedBroadcast();
    }
  };

  const typingBroadcast = () => {
    let to = activeChat?.participants.find(
      (part) => part._id !== user?._id
    )?._id;
    socket && socket.emit("typing", { activeChat: activeChat?._id, to });
  };
  const typingStoppedBroadcast = () => {
    let to = activeChat?.participants.find(
      (part) => part._id !== user?._id
    )?._id;
    socket &&
      socket.emit("typing-stopped", { activeChat: activeChat?._id, to });
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
