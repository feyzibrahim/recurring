"use client";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiSearch } from "react-icons/fi";
import SeeAllButton from "./members/SeeAllButton";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useContext, useEffect, useState } from "react";
import { getChats } from "@/app/lib/features/chat/chatActions";
import SingleChat from "./SingleChat";
import { ChatTypes, EmployeeTypes } from "@/constants/Types";
import { UserContext } from "./UserProvider/UserContextProvider";
import {
  socketNewChatUpdate,
  updateOnlineList,
} from "@/app/lib/features/chat/chatSlice";
import EmptyEmployee from "@/components/empty/EmptyEmployee";
import MembersListLoading from "../MembersListLoading";
import GroupChat from "./group/GroupChat";

const ChatList = () => {
  const dispatch = useAppDispatch();
  const { user, socket } = useContext(UserContext);

  const { chats, loading } = useAppSelector((state) => state.chat);
  const [onlineUserList, setOnlineUserList] =
    useState<{ userId: string; socketId: string }[]>();

  useEffect(() => {
    socket && socket.emit("test-online-user", user?._id);

    socket &&
      socket.on("new-chat", (data) => {
        dispatch(socketNewChatUpdate({ chat: data }));
      });

    socket &&
      socket.on("new-group-chatter", (data) => {
        if (chats) {
          dispatch(socketNewChatUpdate({ chat: data }));
        }
      });

    socket &&
      socket.on("get-online-users", (data: any) => {
        setOnlineUserList(data);
        dispatch(updateOnlineList({ onlineList: data }));
      });
  }, [socket, dispatch, user?._id]);

  useEffect(() => {
    dispatch(getChats({ filter: "" }));
  }, [dispatch]);

  if (!chats) {
    return <MembersListLoading />;
  }

  return (
    <div className="bg-secondary p-5">
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        <SeeAllButton />
      </div>
      <InputWithIcon placeholder="search..." icon={<FiSearch />} />
      <ScrollArea className="h-[82vh] mt-2">
        {loading && <MembersListLoading />}
        {chats && chats.length > 0 ? (
          chats.map((chat: ChatTypes, index) => {
            if (chat.type === "one_to_one") {
              const participant = chat.participants.find(
                (part) => part.username !== user?.username
              );
              let online = onlineUserList?.some(
                (val) => val.userId === participant?._id
              );
              return (
                <SingleChat
                  user={participant as EmployeeTypes}
                  key={index}
                  online={online as boolean}
                />
              );
            } else {
              const participant = chat.participants.filter(
                (part) => part.username !== user?.username
              );
              let online = false;
              onlineUserList?.map((val) => {
                participant.map((part) => {
                  if (part._id === val.userId) {
                    online = true;
                  }
                });
              });

              return <GroupChat chat={chat} online={online} key={index} />;
            }
          })
        ) : !loading ? (
          <div className="flex flex-col items-center justify-center h-[450px]">
            <EmptyEmployee />
            <p>No chats were created</p>
            <p>Please create one</p>
            <SeeAllButton />
          </div>
        ) : null}
      </ScrollArea>
    </div>
  );
};

export default ChatList;
