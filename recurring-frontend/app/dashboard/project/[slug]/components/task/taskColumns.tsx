import EmployeeNameFromStore from "@/components/common/EmployeeNameFromStore";
import UserAvatar from "@/public/img/user-avatar.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EmployeeTypes, SubTaskTypes, TaskTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { format } from "date-fns";
import StatusDiv from "@/components/common/StatusDiv";
import LowMediumHigh from "@/components/common/LowMediumHigh";
import { Progress } from "@/components/ui/progress";

export const columns: ColumnDef<TaskTypes>[] = [
  {
    accessorKey: "slug",
    header: "Slug",
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
      <HoverCard>
        <HoverCardTrigger asChild>
          <p className="hover:underline hover:opacity-80 cursor-pointer">
            {row.getValue("title")}
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{row.getValue("title")}</h4>
            <p className="text-sm">
              {/* {row.getValue("description") || "No description were given"} */}
              {"No description were given"}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Assignee
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      let assignee: EmployeeTypes = row.getValue("assignee");
      return (
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 rounded-full overflow-clip">
            <Image
              src={
                (assignee &&
                  typeof assignee !== "string" &&
                  (assignee.profileImageURL as string)) ||
                UserAvatar
              }
              alt="Profile"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          </div>
          <p className="line-clamp-1 max-w-36">
            <EmployeeNameFromStore employee={assignee as EmployeeTypes} />
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) =>
      format(new Date(row.getValue("startDate")), "MMM d, yyyy"),
  },
  {
    accessorKey: "dueDate",
    header: "End Date",
    cell: ({ row }) => format(new Date(row.getValue("dueDate")), "MMM d, yyyy"),
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
    cell: ({ row }) => <StatusDiv status={row.getValue("status")} />,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Priority
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <LowMediumHigh priority={row.getValue("priority")} />,
  },
  {
    accessorKey: "subTasks",
    header: "Completion",
    cell: ({ row }) => {
      const subTask: SubTaskTypes[] = row.getValue("subTasks");
      let completed = 0;
      subTask.map((sub) => {
        if (sub.status === "completed") {
          completed++;
        }
      });

      const value = ((completed / subTask.length) * 100) >> 0;

      if (subTask.length === 0) {
        return null;
      }

      return (
        <span className="flex items-center gap-2">
          <Progress value={value} className="h-1" />
          {value ?? ""}%
        </span>
      );
    },
  },
];
