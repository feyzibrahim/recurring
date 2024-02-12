"use client";

import { useAppSelector } from "@/app/lib/hook";
import { format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function TaskListTable() {
  const { tasks } = useAppSelector((state) => state.task);

  return (
    <ScrollArea className="w-72 md:w-full text-sm  whitespace-nowrap col-span-2">
      <table className="w-full border-collapse my-2 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Title</th>
            <th className="border-t border-background p-3">Start Date</th>
            <th className="border-t border-background p-3">End Date</th>
            <th className="border-t border-background p-3">Status</th>
            <th className="border-t border-background p-3">Priority</th>
            <th className="border-t border-background p-3">Tags</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task, index) => (
              <tr key={index}>
                <td className="border-t border-background p-3">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <p className="hover:underline hover:opacity-80 cursor-pointer">
                        {task.title}
                      </p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{task.title}</h4>
                        <p className="text-sm">
                          {task.description || "No description were given"}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </td>

                <td className="border-t border-background p-3">
                  {format(new Date(task.startDate), "MMM d, yyyy")}
                </td>
                <td className="border-t border-background p-3">
                  {format(new Date(task.dueDate), "MMM d, yyyy")}
                </td>
                <td className="border-t border-background p-3 capitalize">
                  {task.status}
                </td>
                <td className="border-t border-background p-3 capitalize">
                  {task.priority}
                </td>
                <td className="border-t border-background p-3">
                  {task.tags && task.tags.length > 0 ? task.tags : "-"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
