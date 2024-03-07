"use client";

import React, { useEffect } from "react";
import MessageBox from "./MessageBox";
import GroupHeader from "./GroupHeader";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { setActiveChatWithSlug } from "@/app/lib/features/chat/chatSlice";
import { getChats } from "@/app/lib/features/chat/chatActions";
import GroupContainer from "./GroupContainer";

const Group = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();

  const { chats } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (!chats || chats.length === 0) {
      dispatch(getChats({ filter: "" }));
    }
    if (chats) {
      dispatch(setActiveChatWithSlug({ slug }));
    }
  }, [slug, chats, dispatch]);

  return (
    <>
      {/* Group Header */}
      <GroupHeader slug={slug} />
      {/* Group Section */}
      <div className="flex flex-col justify-between h-[89vh]">
        <GroupContainer />
        <MessageBox />
      </div>
    </>
  );
};

export default Group;
