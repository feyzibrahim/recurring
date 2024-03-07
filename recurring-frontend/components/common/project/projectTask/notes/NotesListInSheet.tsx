"use client";
import { useAppSelector } from "@/app/lib/hook";
import NewNotesButton from "./NewNotesButton";
import UserAvatar from "@/components/common/UserAvatar";
import EmptyMessage from "@/components/empty/EmptyMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeTypes } from "@/constants/Types";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import ReplayButton from "./ReplayButton";

const NotesListInSheet = ({ user }: { user: EmployeeTypes }) => {
  const { task } = useAppSelector((state) => state.task);

  return (
    <div className="py-3">
      {task && (
        <div>
          <div className="flex items-center justify-between gap-2 pb-3">
            <h1 className="font-bold text-xl">Comments</h1>
            <NewNotesButton user={user} />
          </div>
          <ScrollArea className="h-52">
            {task.notes && task.notes.length > 0 ? (
              task.notes.map((note, index) => (
                <div className="text-sm mb-1" key={index}>
                  {typeof note.user !== "string" && (
                    <div className="flex gap-2">
                      <UserAvatar
                        profileImageURL={note.user.profileImageURL as string}
                        size="w-7 h-7"
                      />
                      <div className="w-full">
                        <div className="bg-backgroundAccent rounded-md w-full p-2">
                          <div className="flex justify-between items-center">
                            <p className="font-bold line-clamp-1">
                              {note.user.firstName} {note.user.lastName}
                            </p>
                            <p className="text-xs text-foregroundAccent shrink-0">
                              {formatDistanceToNow(new Date(note.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <p className="pt-2">{note.text}</p>
                        </div>
                        <ReplayButton note={note} />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-52">
                <EmptyMessage />
                <p className="pt-3">No comments yet!</p>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default NotesListInSheet;
