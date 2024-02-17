import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface MessageTypes {
  message: string;
}

const MyChat = ({ message }: MessageTypes) => {
  return (
    <div className="flex items-center gap-2 mt-2 justify-end mb-1">
      <BsThreeDotsVertical className="text-xl cursor-pointer text-backgroundAccent hover:text-foregroundAccent " />
      <div className="bg-primary w-fit flex items-end gap-2 rounded-tl-lg rounded-b-lg max-w-96">
        <p className="p-2">{message}</p>
        <p className="text-xs text-foreground pr-2">10:30AM</p>
      </div>
    </div>
  );
};

export default MyChat;
