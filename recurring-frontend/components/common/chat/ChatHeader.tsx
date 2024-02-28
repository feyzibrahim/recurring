"use client";
import UserAvatar from "@/components/common/UserAvatar";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/lib/hook";
import useHeaderHook from "./hooks/useHeaderHook";

const ChatHeader = ({ username }: { username: string }) => {
  const { activeChat } = useAppSelector((state) => state.chat);
  const {
    getCurrentUser,
    typing,
    videoCallUser,
    isModalOpen,
    setIsModalOpen,
    setVideoCallActive,
    videoCallActive,
    hangUpCall,
  } = useHeaderHook(username);

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
      <AiOutlineVideoCameraAdd
        className="text-2xl hover:text-foregroundAccent cursor-pointer"
        onClick={videoCallUser}
      />

      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setVideoCallActive(false);
        }}
      >
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle className="animate-pulse">
              {videoCallActive ? "Video Calling..." : "Call Declined"}
            </DialogTitle>
            <DialogDescription>
              {videoCallActive
                ? "Please wait while the user accepts the call"
                : "User declined the call please try later..."}
            </DialogDescription>
            {videoCallActive && (
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
