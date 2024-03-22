import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewAttachmentButton from "../attachments/NewAttachmentButton";

const TaskAttachments = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 pb-3">
        <h1 className="font-bold text-xl">Attachments</h1>
        <NewAttachmentButton />
      </div>
      <ScrollArea className="h-20 bg-backgroundAccent rounded-md border mb-2">
        <div className="flex items-center justify-center h-20">
          <p>No Attachments</p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskAttachments;
