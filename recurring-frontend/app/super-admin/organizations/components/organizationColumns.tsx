import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { EmployeeTypes, OrganizationTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AvatarFallbackImage from "@/components/common/AvatarFallbackImage";

export const columns: ColumnDef<OrganizationTypes>[] = [
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
          Name
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
    accessorKey: "admin",
    header: "Admin",
    cell: ({ row }) => {
      let admin: EmployeeTypes = row.getValue("admin");
      return (
        <div className="flex gap-1 items-center">
          {admin && (
            <Avatar className={`w-7 h-7`}>
              <AvatarImage src={admin.profileImageURL} />
              <AvatarFallbackImage />
            </Avatar>
          )}
          {admin && `${admin.firstName ?? ""} ${admin.lastName ?? ""}`}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (row.getValue("isActive") ? "Active" : "In-Active"),
  },
  {
    accessorKey: "industry",
    header: "Industry",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("industry")}</span>
    ),
  },
  {
    accessorKey: "subscriptionType",
    header: "Subscription Type",
  },
];
