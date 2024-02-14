"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import LeaveForm from "./LeaveForm";
import { FiEdit } from "react-icons/fi";
import { LeaveTypes } from "@/constants/Types";

interface PropsTypes {
  leave: LeaveTypes;
}

const UpdateLeaveButton = ({ leave }: PropsTypes) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="hover:opacity-60 cursor-pointer"
      >
        <FiEdit />
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave Approval</DialogTitle>
          </DialogHeader>
          <LeaveForm setIsModalOpen={setIsModalOpen} leave={leave} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateLeaveButton;
