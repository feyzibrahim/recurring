"use client";
import InputWithIcon from "@/components/custom/InputWithIcon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FiSearch } from "react-icons/fi";
import SeeAllButton from "./members/SeeAllButton";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { getChats } from "@/app/lib/features/chat/chatActions";
import SingleChat from "./SingleChat";

const ChatList = () => {
  const dispatch = useAppDispatch();

  const { chats } = useAppSelector((state) => state.chat);

  useEffect(() => {
    dispatch(getChats({ filter: "" }));
  }, []);

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
            return (
              <SingleChat user={chat.participants[0]} key={index} chat={chat} />
            );
          })}
      </ScrollArea>
    </div>
  );
};

export default ChatList;

{
  /* <ScrollArea className="h-[550px] py-5">
  <div className="flex items-center gap-2">
    <Skeleton className="w-10 h-10 rounded-full bg-background shrink-0" />
    <div className="w-full">
      <Skeleton className="w-full h-4 rounded-sm bg-background mb-1" />
      <Skeleton className="w-1/2 h-4 rounded-sm bg-background" />
    </div>
  </div>
</ScrollArea>; */
}
