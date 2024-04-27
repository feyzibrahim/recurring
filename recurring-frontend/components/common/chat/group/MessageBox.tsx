"use client";
import { useAppSelector } from "@/app/lib/hook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { FiSend } from "react-icons/fi";
import { UserContext } from "../UserProvider/UserContextProvider";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { MessageTypes } from "@/constants/Types";
import { AiOutlinePaperClip } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FileUploadSelector from "./FileUploadSelector";

const MessageBox = ({ setMessages }: { setMessages: any }) => {
  const { user, socket } = useContext(UserContext);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [message, setMessage] = useState("");
  const { activeChat } = useAppSelector((state) => state.chat);

  const handleMessageSent = () => {
    if (message.trim() !== "") {
      socket &&
        activeChat &&
        user &&
        socket.emit("group-message", activeChat.slug, {
          content: message,
          type: "text",
          chat: activeChat._id,
          from: user._id,
        });
      setMessage("");
      setMessages((prevMessages: MessageTypes[]) => [
        ...prevMessages,
        {
          content: message,
          type: "text",
          chat: activeChat?._id,
          from: user,
          createdAt: Date.now(),
        },
      ]);
      typingStoppedBroadcast();
      setShowEmoji(false);
    }
  };

  const typingBroadcast = () => {
    socket &&
      user &&
      activeChat &&
      socket.emit("typing-group", activeChat.slug, {
        activeChat: activeChat._id,
        from: { firstName: user.firstName, lastName: user.lastName },
      });
  };

  const typingStoppedBroadcast = () => {
    socket &&
      user &&
      activeChat &&
      socket.emit("typing-stopped-group", activeChat.slug, {
        activeChat: activeChat._id,
        from: { firstName: user.firstName, lastName: user.lastName },
      });
  };

  return (
    <div className="bg-backgroundAccent px-5 py-5 relative">
      <div>
        <Input
          className="rounded-full"
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
          <FileUploadSelector
            setMessages={setMessages}
            setIsModalOpen={setIsModalOpen}
          />
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
  );
};

export default MessageBox;
