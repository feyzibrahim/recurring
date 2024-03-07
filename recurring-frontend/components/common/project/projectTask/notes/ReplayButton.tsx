"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { NotesTypes } from "@/constants/Types";
import UserAvatar from "@/components/common/UserAvatar";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/app/lib/hook";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";
import { useDispatch } from "react-redux";
import { replayToTaskComment } from "@/app/lib/features/task/taskActions";
import { ScrollArea } from "@/components/ui/scroll-area";
import Replay from "./Replay";

interface Props {
  note: NotesTypes;
}

const ReplayButton = ({ note }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replayMessage, setReplayMessage] = useState("");
  const { task } = useAppSelector((state) => state.task);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();

  const handleReplaySubmit = () => {
    const data = {
      slug: task?.slug,
      noteId: note._id,
      replay: {
        text: replayMessage,
        user: user?._id,
      },
    };
    dispatch(replayToTaskComment(data));
    setReplayMessage("");
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-xs mt-1"
        onClick={() => setIsModalOpen(true)}
      >
        Replays {note.replay && `(${note.replay.length})`}
      </Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Comment</DialogTitle>
            <DialogDescription>
              Update in the below form. After your done click the add button
            </DialogDescription>
          </DialogHeader>
          <div className="text-sm mb-1">
            {typeof note.user !== "string" && (
              <div className="flex gap-2">
                <UserAvatar
                  profileImageURL={note.user.profileImageURL as string}
                  size="w-7 h-7"
                />
                <div className="w-full">
                  <div className="bg-backgroundAccent rounded-md w-full p-2">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">
                        {note.user.firstName} {note.user.lastName}
                      </p>
                      <p className="text-xs text-foregroundAccent">
                        {formatDistanceToNow(new Date(note.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <p className="pt-2">{note.text}</p>
                  </div>
                  <ScrollArea className="w-full h-60 mt-2">
                    {note.replay &&
                      note.replay.length > 0 &&
                      note.replay.map((replay, index) => {
                        return <Replay replay={replay} key={index} />;
                      })}
                  </ScrollArea>
                </div>
              </div>
            )}
            <div className="mt-2">
              <Input
                placeholder="Replay..."
                value={replayMessage}
                onChange={(e) => setReplayMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    handleReplaySubmit();
                  }
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReplayButton;
