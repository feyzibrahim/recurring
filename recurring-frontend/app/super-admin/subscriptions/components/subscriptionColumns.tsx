import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Customer Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const customer: any = row.getValue("customer");

      return <div>{customer && customer?.name}</div>;
    },
  },
  {
    accessorKey: "customer",
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
    cell: ({ row }) => {
      const customer: any = row.getValue("customer");

      return <div>{customer && customer?.email}</div>;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      const data: any = row.getValue("created");

      return <span>{format(new Date(data * 1000), "MMM, dd yyyy")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status ",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Amount",
    cell: ({ row }) => {
      const data: any = row.getValue("plan");

      return (
        <span className="capitalize">
          ₹{data && parseInt(data.amount) / 100}
        </span>
      );
    },
  },
  {
    accessorKey: "plan",
    header: "Type",
    cell: ({ row }) => {
      const data: any = row.getValue("plan");

      return <span className="capitalize">{data && data.product.name}</span>;
    },
  },
];
