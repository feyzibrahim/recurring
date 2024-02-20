"use client";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiSearch } from "react-icons/fi";
import SeeAllButton from "./members/SeeAllButton";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useContext, useEffect } from "react";
import { getChats } from "@/app/lib/features/chat/chatActions";
import SingleChat from "./SingleChat";
import { ChatTypes, EmployeeTypes } from "@/constants/Types";
import { UserContext } from "./UserProvider/UserContextProvider";
import {
  socketNewChatUpdate,
  updateOnlineStatus,
} from "@/app/lib/features/chat/chatSlice";

const ChatList = () => {
  const dispatch = useAppDispatch();
  const { user, socket } = useContext(UserContext);

  const { chats } = useAppSelector((state) => state.chat);

  useEffect(() => {
    socket &&
      socket.on("new-chat", (data) => {
        dispatch(socketNewChatUpdate({ chat: data }));
      });

    socket &&
      socket.on("get-online-users", (data) => {
        dispatch(updateOnlineStatus({ onlineList: data, userId: user?._id }));
      });
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(getChats({ filter: "" }));
  }, [dispatch]);

  return (
    <div className="bg-secondary p-5">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        <SeeAllButton />
      </div>
      <InputWithIcon placeholder="search..." icon={<FiSearch />} />
      <ScrollArea className="h-[450px] mt-2">
        {chats &&
          chats.map((chat, index) => {
            const participant = chat.participants.find(
              (part) => part.username !== user?.username
            );
            return (
              <SingleChat
                user={participant as EmployeeTypes}
                key={index}
                online={chat.online}
              />
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
