import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EmployeeTypes, ProjectTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import StatusDiv from "@/components/common/StatusDiv";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AvatarFallbackImage from "@/components/common/AvatarFallbackImage";

export const columns: ColumnDef<ProjectTypes>[] = [
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "name",
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
            {row.getValue("name")}
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{row.getValue("name")}</h4>
            <p className="text-sm">
              {row.getValue("description") || "No description were given"}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "members",
    header: "Assignee",
    cell: ({ row }) => {
      let members: EmployeeTypes[] = row.getValue("members");
      return (
        <div className="flex">
          {members &&
            members.map(
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) =>
      format(new Date(row.getValue("startDate")), "MMM d, yyyy"),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => format(new Date(row.getValue("endDate")), "MMM d, yyyy"),
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
];

export const columnsDashboard: ColumnDef<ProjectTypes>[] = [
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "name",
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
            {row.getValue("name")}
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{row.getValue("name")}</h4>
            <p className="text-sm">
              {row.getValue("description") || "No description were given"}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => {
      let manager: EmployeeTypes = row.getValue("manager");
      return (
        <div className="flex gap-1 items-center">
          {manager && (
            <Avatar className={`w-7 h-7`}>
              <AvatarImage src={manager.profileImageURL} />
              <AvatarFallbackImage />
            </Avatar>
          )}
          {manager && `${manager.firstName} ${manager.lastName}`}
        </div>
      );
    },
  },
  {
    accessorKey: "members",
    header: "Assignee",
    cell: ({ row }) => {
      let members: EmployeeTypes[] = row.getValue("members");
      return (
        <div className="flex">
          {members &&
            members.map(
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
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) =>
      format(new Date(row.getValue("startDate")), "MMM d, yyyy"),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => format(new Date(row.getValue("endDate")), "MMM d, yyyy"),
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
];
