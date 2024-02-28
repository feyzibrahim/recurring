import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SubTaskTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import StatusDiv from "@/components/common/StatusDiv";

export const columns: ColumnDef<SubTaskTypes>[] = [
  {
    accessorKey: "_id",
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
          <p className="line-clamp-1">{row.getValue("title")}</p>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{row.getValue("title")}</h4>
          </div>
        </HoverCardContent>
      </HoverCard>
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
    cell: ({ row }) => <StatusDiv status={row.getValue("status")} />,
  },
];
