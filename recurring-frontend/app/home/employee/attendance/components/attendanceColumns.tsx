import { AttendanceTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<AttendanceTypes>[] = [
  {
    accessorKey: "date",
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
    cell: ({ row }) => format(new Date(row.getValue("date")), "MMM d, yyyy"),
  },
  {
    accessorKey: "checkInTime",
    header: "Check In Time",
    cell: ({ row }) => format(new Date(row.getValue("checkInTime")), "h:mm a"),
  },
  {
    accessorKey: "checkOutTime",
    header: "Check Out Time",
    cell: ({ row }) => format(new Date(row.getValue("checkOutTime")), "h:mm a"),
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
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
  },
  { accessorKey: "remarks", header: "Remarks" },
];
