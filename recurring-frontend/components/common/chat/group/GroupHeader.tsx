"use client";
import UserAvatar from "@/components/common/UserAvatar";
import { useAppSelector } from "@/app/lib/hook";
import useHeaderHook from "./useHeaderHook";

const GroupHeader = ({ slug }: { slug: string }) => {
  const { activeChat } = useAppSelector((state) => state.chat);
  const { typing } = useHeaderHook(slug);

  return (
    <div className="flex gap-2 items-center shadow-md p-5 ">
      {activeChat && (
        <UserAvatar profileImageURL={activeChat.groupProfile as string} />
      )}
      <div className="w-full">
        {activeChat && activeChat.groupName}
        {activeChat && (
          <p className="text-xs text-foregroundAccent">
            {activeChat.participants.length} members
          </p>
        )}
        {/* {activeChat && activeChat.online ? (
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
        )} */}
      </div>
    </div>
  );
};

export default GroupHeader;
