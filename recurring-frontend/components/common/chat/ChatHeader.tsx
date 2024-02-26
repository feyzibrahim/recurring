"use client";
import { useAppSelector } from "@/app/lib/hook";
import UserAvatar from "@/components/common/UserAvatar";
import { ChatTypes, EmployeeTypes } from "@/constants/Types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider/UserContextProvider";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ChatHeader = () => {
  const { user, socket } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callingHeader, setCallingHeader] = useState("Video Calling...");
  const [callingDescription, setCallingDescription] = useState(
    "Please wait while the user accepts the call"
  );

  const [typing, setTyping] = useState(false);

  const { activeChat } = useAppSelector((state) => state.chat);

  useEffect(() => {
    socket &&
      socket.on("typing", (data) => {
        if (data.to === user?._id) {
          setTyping(true);
        }
      });

    socket &&
      socket.on("typing-stopped", (data) => {
        if (data.to === user?._id) {
          setTyping(false);
        }
      });

    socket &&
      socket.on("video-call-declined", (data) => {
        setCallingHeader("Call Declined");
        setCallingDescription("User declined the call please try later...");
      });
  }, [socket, user?._id]);

  useEffect(() => {
    socket &&
      socket.on("chat", (data) => {
        setTyping(false);
      });
  }, [socket]);

  useEffect(() => {
    if (typing) {
      setTimeout(() => setTyping(false), 3000);
    }
  }, [typing]);

  const getCurrentUser = (chat: ChatTypes) => {
    let temp = chat.participants.find(
      (part) => part.username !== user?.username
    );

    return temp as EmployeeTypes;
  };

  const videoCallUser = () => {
    const callId = uuid();
    if (activeChat) {
      let temp = activeChat.participants.find(
        (part) => part.username !== user?.username
      );

      if (temp && user) {
        socket &&
          socket.emit("video-call", { to: temp._id, from: user._id, callId });
        setIsModalOpen(true);
      }
    }
  };
  const hangUpCall = () => {
    if (activeChat) {
      let temp = activeChat.participants.find(
        (part) => part.username !== user?.username
      );

      if (temp && user) {
        socket &&
          socket.emit("video-call-hangup", { to: temp._id, from: user._id });
        setIsModalOpen(true);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center shadow-md p-5 ">
      {activeChat && (
        <UserAvatar
          profileImageURL={getCurrentUser(activeChat).profileImageURL as string}
        />
      )}
      <div className="w-full">
        {activeChat &&
          `${getCurrentUser(activeChat).firstName} ${
            getCurrentUser(activeChat).lastName
          }`}
        {activeChat && activeChat.online ? (
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
            {typing ? (
              <p className="text-xs animate-pulse">typing...</p>
            ) : (
              <p>Online</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-red-600"></div>
            <p>Offline</p>
          </div>
        )}
      </div>
      {/* <Link href={`${username}/video`} onClick={videoCallUser}> */}
      <AiOutlineVideoCameraAdd
        className="text-2xl hover:text-foregroundAccent cursor-pointer"
        onClick={videoCallUser}
      />
      {/* </Link> */}

      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setCallingHeader("Video Calling...");
          setCallingDescription("Please wait while the user accepts the call");
        }}
      >
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle className="animate-pulse">{callingHeader}</DialogTitle>
            <DialogDescription>{callingDescription}</DialogDescription>
            {callingHeader === "Video Calling..." && (
              <Button variant="destructive" onClick={hangUpCall}>
                Cancel Call
              </Button>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatHeader;
