import { EmployeeTypes } from "@/constants/Types";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import StatusDiv from "@/components/common/StatusDiv";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AvatarFallbackImage from "@/components/common/AvatarFallbackImage";

export const columns: ColumnDef<EmployeeTypes>[] = [
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "profileImageURL",
    header: "Profile",
    cell: ({ row }) => (
      <Avatar className={`w-7 h-7`}>
        <AvatarImage src={row.getValue("profileImageURL")} />
        <AvatarFallbackImage />
      </Avatar>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          First Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-1 items-center hover:text-foreground cursor-pointer"
        >
          Last Name
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
  // {
  //   accessorKey: "admin",
  //   header: "Admin",
  //   cell: ({ row }) => {
  //     let admin: EmployeeTypes = row.getValue("admin");
  //     return (
  //       <div className="flex gap-1 items-center">
  //         {admin && (
  //           <Avatar className={`w-7 h-7`}>
  //             <AvatarImage src={admin.profileImageURL} />
  //             <AvatarFallbackImage />
  //           </Avatar>
  //         )}
  //         {admin && `${admin.firstName ?? ""} ${admin.lastName ?? ""}`}
  //       </div>
  //     );
  //   },
  // },

  // {
  //   accessorKey: "startDate",
  //   header: "Start Date",
  //   cell: ({ row }) =>
  //     format(new Date(row.getValue("startDate")), "MMM d, yyyy"),
  // },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (row.getValue("isActive") ? "Active" : "In-Active"),
  },
];
