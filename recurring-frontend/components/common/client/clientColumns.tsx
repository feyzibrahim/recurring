import { ClientTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<ClientTypes>[] = [
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "individualDetails",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const data: { firstName: string; lastName: string } =
        row.getValue("individualDetails");
      return (
        <span>
          {data && data.firstName} {data && data.lastName}
        </span>
      );
    },
  },
  {
    accessorKey: "companyDetails",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Company
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const data: { companyName: string; contactPerson: string } =
        row.getValue("companyDetails");
      return <span>{data && data.companyName}</span>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Contact Number
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("type")}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Created on
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) =>
      format(new Date(row.getValue("createdAt")), "MMM d, yyyy"),
  },
];
