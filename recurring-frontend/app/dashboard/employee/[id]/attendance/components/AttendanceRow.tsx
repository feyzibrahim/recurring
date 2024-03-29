import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AttendanceTypes } from "@/constants/Types";
import { PaginationCustom } from "@/components/custom/PaginationCustom";
import { useAppSelector } from "@/app/lib/hook";

export function AttendanceRow() {
  const { attendances, length } = useAppSelector((state) => state.attendance);

  return (
    <ScrollArea className="w-full md:w-full text-sm  whitespace-nowrap col-span-3 pb-2">
      <table className="w-full border-collapse my-2 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Date</th>
            <th className="border-t border-background p-3">Check In Time</th>
            <th className="border-t border-background p-3">Check Out Time</th>
            <th className="border-t border-background p-3">Status</th>
            <th className="border-t border-background p-3">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {attendances &&
            attendances.map((attendance, index) => (
              <tr key={index}>
                <td className="border-t border-background p-3">
                  {attendance &&
                    attendance.date &&
                    format(new Date(attendance.date), "MMM d, yyyy")}
                </td>
                <td className="border-t border-background p-3">
                  {attendance && attendance.checkInTime
                    ? format(new Date(attendance.checkInTime), "h:mm a")
                    : "-"}
                </td>
                <td className="border-t border-background p-3">
                  {attendance && attendance.checkOutTime
                    ? format(new Date(attendance.checkOutTime), "h:mm a")
                    : "-"}
                </td>
                <td className="border-t border-background p-3 capitalize">
                  {attendance && attendance.status && attendance.status}
                </td>
                <td className="border-t border-background p-3">
                  {(attendance && attendance.remarks && attendance.remarks) ||
                    "-"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {length && length > 10 && (
        <PaginationCustom rowLength={length} rowsPerPage={10} />
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
