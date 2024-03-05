import { useAppSelector } from "@/app/lib/hook";
import { ChatTypes, EmployeeTypes } from "@/constants/Types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserProvider/UserContextProvider";
import { v4 as uuid } from "uuid";
import { usePathname, useRouter } from "next/navigation";

const useHeaderHook = (username: string) => {
  const { user, socket } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  let path = pathName.split("/");
  let curr = path[1];

  const [videoCallActive, setVideoCallActive] = useState(false);

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
        setVideoCallActive(false);
      });
    socket &&
      socket.on("video-call-accepted", (data) => {
        router.push(`/${curr}/video-call/${data.callId}`);
        // setVideoCallActive(false);
      });
  }, [socket, user?._id, router, username]);

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
    setVideoCallActive(true);
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
        setIsModalOpen(false);
      }
    }
  };

  return {
    getCurrentUser,
    typing,
    videoCallUser,
    isModalOpen,
    setIsModalOpen,
    setVideoCallActive,
    videoCallActive,
    hangUpCall,
  };
};

export default useHeaderHook;
