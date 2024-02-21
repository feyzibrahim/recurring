import { EmployeeTypes, MeetingTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format, isAfter, isBefore } from "date-fns";
import StatusDiv from "@/components/common/StatusDiv";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AvatarFallbackImage from "@/components/common/AvatarFallbackImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiEdit } from "react-icons/fi";

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(":");
  const time = new Date();
  time.setHours(parseInt(hours));
  time.setMinutes(parseInt(minutes));
  return format(time, "h:mm a");
};

const isExpired = (timeString: string, dateString: string) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const time = new Date();
  time.setFullYear(year);
  time.setMonth(month - 1);
  time.setDate(day);
  time.setHours(parseInt(hours));
  time.setMinutes(parseInt(minutes));
  return isAfter(Date.now(), time);
};
const isActive = (startTime: string, endTime: string, dateString: string) => {
  const [startHours, startMinutes] = startTime.split(":");
  const [endHours, endMinutes] = endTime.split(":");
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const startTimeObject = new Date();
  startTimeObject.setFullYear(year);
  startTimeObject.setMonth(month - 1);
  startTimeObject.setDate(day);
  startTimeObject.setHours(parseInt(startHours));
  startTimeObject.setMinutes(parseInt(startMinutes));

  const endTimeObject = new Date();
  endTimeObject.setFullYear(year);
  endTimeObject.setMonth(month - 1);
  endTimeObject.setDate(day);
  endTimeObject.setHours(parseInt(endHours));
  endTimeObject.setMinutes(parseInt(endMinutes));

  const currentTime = Date.now();
  return (
    isAfter(currentTime, startTimeObject) &&
    isBefore(currentTime, endTimeObject)
  );
};

export const columns: ColumnDef<MeetingTypes>[] = [
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p>{row.getValue("title")}</p>
        <p className="line-clamp-1 text-xs text-foregroundAccent">
          {row.getValue("description")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "participants",
    header: "Assignee",
    cell: ({ row }) => {
      let participants: EmployeeTypes[] = row.getValue("participants");
      return (
        <div className="flex">
          {participants.map(
            (member, index) =>
              typeof member !== "string" && (
                <Avatar
                  key={index}
                  className={`w-7 h-7 border ${index !== 0 ? "-ml-2" : ""}`}
                >
                  <AvatarImage src={member.profileImageURL} />
                  <AvatarFallbackImage />
                </Avatar>
              )
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.getValue("date")), "MMM d, yyyy"),
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "Start Time",
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) =>
      `${formatTime(row.getValue("startTime"))} - ${formatTime(
        row.getValue("endTime")
      )}`,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("type")}</span>
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) =>
      isActive(
        row.getValue("startTime"),
        row.getValue("endTime"),
        row.getValue("date")
      ) ? (
        <Link href="meetings/conference">
          <Button variant="link" className="border border-primary">
            Start
          </Button>
        </Link>
      ) : isExpired(row.getValue("endTime"), row.getValue("date")) ? (
        <p className="text-xs text-foregroundAccent">Expired</p>
      ) : (
        <Link href={`meetings/edit/${row.getValue("slug")}`}>
          <FiEdit className="hover:text-foregroundAccent cursor-pointer" />
        </Link>
      ),
  },
];
