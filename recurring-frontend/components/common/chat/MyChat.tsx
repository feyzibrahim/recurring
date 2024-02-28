import { MessageTypes } from "@/constants/Types";
import { format } from "date-fns";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface PropTypes {
  message: MessageTypes;
}

const MyChat = ({ message }: PropTypes) => {
  return (
    <div className="flex items-center gap-2 mt-2 justify-end mb-1">
      <BsThreeDotsVertical className="text-xl cursor-pointer text-backgroundAccent hover:text-foregroundAccent " />
      <div className="bg-primary w-fit flex items-end gap-2 rounded-tl-lg rounded-b-lg max-w-96">
        <p className="p-2">{message.message || message.content}</p>
        <p className="text-xs text-foreground pr-2">
          {format(message.createdAt, "hh:mm:a")}
        </p>
      </div>
    </div>
  );
};

export default MyChat;
