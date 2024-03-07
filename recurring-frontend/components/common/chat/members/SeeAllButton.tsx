"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AllMembers from "./AllMembers";
import { useState } from "react";
import GroupChatCreationList from "./GroupChatCreationList";
import { Switch } from "@/components/ui/switch";

const SeeAllButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGroup, setIsGroup] = useState(false);

  return (
    <>
      <p
        className="text-xs hover:text-foregroundAccent cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        New Chat
      </p>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose below members</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <p>Group:</p>
            <Switch
              checked={isGroup}
              onCheckedChange={(value) => setIsGroup(value)}
            />
          </div>
          {isGroup ? (
            <GroupChatCreationList setIsModalOpen={setIsModalOpen} />
          ) : (
            <AllMembers setIsModalOpen={setIsModalOpen} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SeeAllButton;
