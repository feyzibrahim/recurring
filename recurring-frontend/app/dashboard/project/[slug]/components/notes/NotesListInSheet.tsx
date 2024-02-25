"use client";
import { useAppSelector } from "@/app/lib/hook";
import NewNotesButton from "./NewNotesButton";
import UserAvatar from "@/components/common/UserAvatar";
import EmptyMessage from "@/components/empty/EmptyMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmployeeTypes } from "@/constants/Types";

const NotesListInSheet = ({ user }: { user: EmployeeTypes }) => {
  const { task } = useAppSelector((state) => state.task);

  return (
    <div className="py-3">
      {task && (
        <div>
          <div className="flex items-center justify-between gap-2 pb-3">
            <h1 className="font-bold text-xl">Notes</h1>
            <NewNotesButton user={user} />
          </div>
          <ScrollArea className="h-52">
            {task.notes && task.notes.length > 0 ? (
              task.notes.map((note, index) => (
                <div
                  className="bg-background text-sm border rounded-sm mb-5 p-2"
                  key={index}
                >
                  {typeof note.user !== "string" && (
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        profileImageURL={note.user.profileImageURL as string}
                      />
                      {note.user.firstName} {note.user.lastName}
                    </div>
                  )}
                  <p className="pt-2">{note.text}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-52">
                <EmptyMessage />
                <p className="pt-3">No notes yet!</p>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default NotesListInSheet;
