import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LeaveTypes } from "@/constants/Types";
import UpdateLeaveButton from "./UpdateLeaveButton";

interface Props {
  leaves: LeaveTypes[];
}

export function LeaveTable({ leaves }: Props) {
  return (
    <ScrollArea className="w-full md:w-full text-sm whitespace-nowrap col-span-3">
      <table className="w-full border-collapse my-2 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Applied On</th>
            <th className="border-t border-background p-3">Start Date</th>
            <th className="border-t border-background p-3">End Date</th>
            <th className="border-t border-background p-3">Reason</th>
            <th className="border-t border-background p-3">Status</th>
            <th className="border-t border-background p-3">Update</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td className="border-t border-background p-3">
                {leave &&
                  leave.startDate &&
                  format(new Date(leave.createdAt), "MMM d, yyyy")}
              </td>
              <td className="border-t border-background p-3">
                {leave &&
                  leave.startDate &&
                  format(new Date(leave.startDate), "MMM d, yyyy")}
              </td>
              <td className="border-t border-background p-3">
                {leave &&
                  leave.endDate &&
                  format(new Date(leave.endDate), "MMM d, yyyy")}
              </td>
              <td className="border-t border-background p-3">
                {leave && leave.reason}
              </td>
              <td className="border-t border-background p-3 capitalize">
                {leave && leave.status}
              </td>
              <td className="border-t border-background p-3 capitalize">
                {leave && leave.status === "pending" && (
                  <UpdateLeaveButton leave={leave} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
