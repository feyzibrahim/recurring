import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ClientTypes, DealTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import LowMediumHigh from "../LowMediumHigh";
import StatusDivDeal from "../StatusDivDeal";
import UserAvatar from "../UserAvatar";

export const columns: ColumnDef<DealTypes>[] = [
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
              {row.getValue("description") || "No description were given"}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => {
      const client: ClientTypes = row.getValue("client");
      if (!client) return null;

      return (
        <div className="flex items-center gap-2">
          <UserAvatar
            profileImageURL={client.details?.profileImageURL ?? ""}
            size="w-6 h-6"
          />
          <p>{client.details.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => <span>₹ {row.getValue("amount")}</span>,
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
    cell: ({ row }) => <StatusDivDeal status={row.getValue("status")} />,
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
    accessorKey: "expectedCloseDate",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Expected close date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) =>
      format(new Date(row.getValue("expectedCloseDate")), "MMM d, yyyy"),
  },
  {
    accessorKey: "lastContacted",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Last contacted on
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) =>
      row.getValue("lastContacted")
        ? format(new Date(row.getValue("lastContacted")), "MMM d, yyyy")
        : "Didn't contact so far",
  },
];
