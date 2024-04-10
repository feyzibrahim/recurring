"use client";
import UserAvatar from "@/components/common/UserAvatar";
import { useAppSelector } from "@/app/lib/hook";
import useHeaderHook from "./useHeaderHook";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useContext } from "react";
import { UserContext } from "../UserProvider/UserContextProvider";

const GroupHeader = ({ slug }: { slug: string }) => {
  const { activeChat, onlineList } = useAppSelector((state) => state.chat);
  const { user } = useContext(UserContext);
  const { typing, typingUser } = useHeaderHook(slug);

  const isOnline = () => {
    const participant =
      activeChat &&
      activeChat.participants.filter(
        (part) => part.username !== user?.username
      );
    let online = false;
    onlineList?.map((val) => {
      participant &&
        participant.map((part) => {
          if (part._id === val.userId) {
            online = true;
          }
        });
    });
    return online;
  };

  return (
    <div className="flex gap-2 items-center shadow-md p-5 ">
      {activeChat && (
        <UserAvatar profileImageURL={activeChat.groupProfile as string} />
      )}
      <div className="w-full">
        {activeChat && activeChat.groupName}
        <div className="flex items-center gap-2">
          {activeChat && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="text-xs text-foregroundAccent cursor-pointer hover:text-foreground">
                  {activeChat.participants.length} members
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-1">
                  {activeChat &&
                    activeChat.participants &&
                    activeChat.participants.map((par, index) => {
                      let online = onlineList?.some(
                        (val) => par._id === val.userId
                      );

                      return (
                        <div
                          key={index}
                          className="flex gap-2 items-center relative"
                        >
                          <UserAvatar
                            profileImageURL={par.profileImageURL as string}
                          />
                          <p>
                            {par.firstName} {par.lastName}
                          </p>
                          {online && (
                            <div className="w-2 h-2 border border-foreground rounded-full absolute bg-green-600 bottom-1 left-9"></div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
          {activeChat && isOnline() ? (
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              {typing && typingUser ? (
                <p className="text-xs animate-pulse">{typingUser} typing...</p>
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
      </div>
    </div>
  );
};

export default GroupHeader;
