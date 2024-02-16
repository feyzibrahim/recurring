"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AllMembers from "./AllMembers";
import { useState } from "react";

const SeeAllButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <p
        className="text-xs hover:text-foregroundAccent cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        See All
      </p>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose below members</DialogTitle>
          </DialogHeader>
          <AllMembers setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SeeAllButton;
