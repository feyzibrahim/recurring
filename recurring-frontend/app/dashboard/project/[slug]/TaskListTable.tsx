"use client";

import CreateProjectButton from "@/components/common/task/CreateTaskButton";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import { useAppSelector } from "@/app/lib/hook";
import { format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function TaskListTable({ slug }: { slug: string }) {
  const { tasks } = useAppSelector((state) => state.task);

  return (
    <div className="w-full text-sm mt-5">
      <table className="w-full border-collapse my-2 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Title</th>
            <th className="border-t border-background p-3">Assignee</th>
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
                  <div className="flex gap-3 items-center">
                    <div className="w-5 h-5">
                      <Image
                        src={UserAvatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    {task.assignee}
                  </div>
                </td>
                <td className="border-t border-background p-3">
                  {format(new Date(task.startDate), "MMMM d, yyyy")}
                </td>
                <td className="border-t border-background p-3">
                  {format(new Date(task.dueDate), "MMMM d, yyyy")}
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
          <tr>
            <td
              className="border-t border-background p-3 hover:opacity-50 cursor-pointer"
              colSpan={7}
            >
              <CreateProjectButton slug={slug} customButton={true} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}