"use client";

import { useAppSelector } from "@/app/lib/hook";
import NoteAddButton from "./NoteAddButton";
import EmptyFolder from "@/components/empty/EmptyFolder";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";
import NoteEditButton from "./NoteEditButton";

interface Props {
  slug: string;
}

const Note = ({ slug }: Props) => {
  const { deal } = useAppSelector((state) => state.deal);
  console.log("file: Note.tsx:18 -> Note -> deal", deal);
  const { user } = useContext(UserContext);
  const reversedNote = deal && deal.note ? [...deal.note].reverse() : [];

  return (
    <div>
      <div className="flex justify-between py-2">
        <h1 className="text-2xl font-bold">Deal Notes</h1>
        <NoteAddButton slug={slug} />
      </div>
      {reversedNote.length > 0 ? (
        reversedNote.map((note, index) => (
          <div className="border rounded-md p-5 mb-3 relative" key={index}>
            <p className="text-xs text-foregroundAccent flex items-center gap-2">
              <FiCalendar />
              {format(note.updatedAt, "MMM, dd, yyyy | hh:mm:aaa")}
            </p>
            <p className="text-sm pt-2">{note.content}</p>
            {user?._id === note.user && (
              <NoteEditButton slug={slug} note={note} />
            )}
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center text-center">
          <div className="flex flex-col items-center">
            <EmptyFolder />
            <p className="pt-5">No note added so far</p>
            <p className="text-foregroundAccent text-xs pt-1">
              Be the first to add an note for this deal
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
