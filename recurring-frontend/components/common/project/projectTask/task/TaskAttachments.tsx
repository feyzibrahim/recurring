import React from "react";
import NewAttachmentButton from "../attachments/NewAttachmentButton";
import { useAppSelector } from "@/app/lib/hook";
import AttachmentRow from "../attachments/AttachmentRow";

const TaskAttachments = () => {
  const { task } = useAppSelector((state) => state.task);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 pb-3">
        <h1 className="font-bold text-xl">Attachments</h1>
        <NewAttachmentButton />
      </div>
      {task && task.attachments && task.attachments.length > 0 ? (
        <div className="max-h-52 overflow-y-auto bg-backgroundAccent rounded-md border mb-2 scrollbar-hide">
          {task.attachments.map((attachment, index) => (
            <AttachmentRow key={index} attachment={attachment} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-20 bg-backgroundAccent rounded-md border mb-2">
          <p>No Attachments</p>
        </div>
      )}
    </div>
  );
};

export default TaskAttachments;
