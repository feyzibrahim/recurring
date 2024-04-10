"use client";
import { useAppSelector } from "@/app/lib/hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { UserContext } from "./UserProvider/UserContextProvider";
import EmojiPicker from "emoji-picker-react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FileUploadSelector from "./FileUploadSelector";

const MessageBox = () => {
  const { user, socket } = useContext(UserContext);

  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { activeChat } = useAppSelector((state) => state.chat);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMessageSent = () => {
    if (message.trim() !== "") {
      socket &&
        socket.emit("message", {
          content: message,
          from: user?._id,
          to: activeChat?.participants.find((part) => part._id !== user?._id)
            ?._id,
          chat: activeChat?._id,
          type: "text",
          fromName: `${user?.firstName} ${user?.lastName}`,
        });
      setMessage("");
      typingStoppedBroadcast();
      setShowEmoji(false);
    }
  };

  const typingBroadcast = () => {
    let to = activeChat?.participants.find(
      (part) => part._id !== user?._id
    )?._id;
    socket && socket.emit("typing", { activeChat: activeChat?._id, to });
  };
  const typingStoppedBroadcast = () => {
    let to = activeChat?.participants.find(
      (part) => part._id !== user?._id
    )?._id;
    socket &&
      socket.emit("typing-stopped", { activeChat: activeChat?._id, to });
  };

  return (
    <>
      <div className="bg-backgroundAccent px-5 py-5 relative">
        <div className="rounded-full overflow-clip bg-background pr-28 border ">
          <Input
            className="rounded-full border-none focus-visible:ring-transparent"
            placeholder="Write a message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              typingBroadcast();
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter" || e.code === "NumpadEnter") {
                handleMessageSent();
              }
            }}
          />
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload file</DialogTitle>
              <DialogDescription>
                Choose the type of file you are planning to send
              </DialogDescription>
            </DialogHeader>
            <FileUploadSelector setIsModalOpen={setIsModalOpen} />
          </DialogContent>
        </Dialog>

        <AiOutlinePaperClip
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="text-2xl cursor-pointer text-foreground hover:text-foregroundAccent absolute right-28 top-7"
        />
        <MdOutlineEmojiEmotions
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-2xl cursor-pointer text-foreground hover:text-foregroundAccent absolute right-20 top-7"
        />
        <Button
          className="rounded-full absolute top-5 right-5 text-xl"
          onClick={handleMessageSent}
        >
          <FiSend />
        </Button>
        {/* Emoji Picker div */}
        <div className="absolute bottom-20 right-20">
          <EmojiPicker
            height={"500px"}
            lazyLoadEmojis
            width={"350px"}
            open={showEmoji}
            reactionsDefaultOpen={false}
            onEmojiClick={(data) => setMessage((prev) => prev + data.emoji)}
          />
        </div>
      </div>
    </>
  );
};

export default MessageBox;
