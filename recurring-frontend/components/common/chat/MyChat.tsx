import { MessageTypes } from "@/constants/Types";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ImageColumns from "./ImageColumns";
import VideoColumns from "./VideoColumns";
import FileColumns from "./FileColumns";

interface PropTypes {
  message: MessageTypes;
}

const MyChat = ({ message }: PropTypes) => {
  return (
    <div className="flex items-center gap-2 mt-2 justify-end mb-1">
      <BsThreeDotsVertical className="text-xl cursor-pointer text-backgroundAccent hover:text-foregroundAccent " />
      <div
        className={`bg-primary w-fit ${
          message.type === "text" && "flex items-end"
        } gap-2 rounded-tl-lg rounded-b-lg max-w-96`}
      >
        {message.type === "text" && <p className="p-2">{message.content}</p>}
        {message.type === "image" && (
          <div
            className={`p-2 ${
              typeof message.content !== "string" && message.content.length > 1
                ? "grid"
                : ""
            } grid-cols-2 gap-2`}
          >
            {typeof message.content !== "string" &&
              message.content.slice(0, 4).map((val: string, index: number) => {
                return (
                  typeof message.content !== "string" && (
                    <div key={index}>
                      <ImageColumns
                        images={message.content}
                        currentImageNumber={index}
                      />
                    </div>
                  )
                );
              })}
          </div>
        )}
        {message.type === "video" && (
          <div
            className={`p-2 ${
              typeof message.content !== "string" && message.content.length > 1
                ? "grid"
                : ""
            } grid-cols-2 gap-2`}
          >
            {typeof message.content !== "string" &&
              message.content.slice(0, 4).map((val: string, index: number) => {
                return (
                  typeof message.content !== "string" && (
                    <VideoColumns
                      currentVideoNumber={index}
                      videos={message.content}
                      key={index}
                    />
                  )
                );
              })}
          </div>
        )}
        {message.type === "file" && (
          <div
            className={`p-2 ${
              typeof message.content !== "string" && message.content.length > 1
                ? "grid"
                : ""
            } grid-cols-2 gap-2`}
          >
            {typeof message.content !== "string" &&
              message.content.slice(0, 4).map((val: string, index: number) => {
                return (
                  typeof message.content !== "string" && (
                    <FileColumns
                      currentFileNumber={index}
                      files={message.content}
                      key={index}
                    />
                  )
                );
              })}
          </div>
        )}
        <p
          className={`text-xs text-foreground pr-2 pb-1 ${
            message.type === "text" ? "" : " text-right"
          }`}
        >
          {format(message.createdAt, "hh:mm:a")}
        </p>
      </div>
    </div>
  );
};

export default MyChat;
