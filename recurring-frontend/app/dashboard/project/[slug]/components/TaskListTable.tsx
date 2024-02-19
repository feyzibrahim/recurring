"use client";

import CreateProjectButton from "@/components/common/task/CreateTaskButton";
import Image from "next/image";
import UserAvatar from "@/public/img/user-avatar.png";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import EmployeeNameFromStore from "@/components/common/EmployeeNameFromStore";
import { EmployeeTypes } from "@/constants/Types";
import { useState } from "react";
import TaskDetailSheet from "./TaskDetailSheet";
import { getTask } from "@/app/lib/features/task/taskActions";

export function TaskListTable({ slug }: { slug: string }) {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const [onEditSheet, setOnEditSheet] = useState(false);

  return (
    <div className="w-full text-sm px-5">
      <TaskDetailSheet
        onOpenChange={onEditSheet}
        setOnOpenChange={setOnEditSheet}
      />
      <table className="w-full border-collapse mt-2 mb-3 bg-backgroundAccent rounded-lg">
        <thead>
          <tr className="text-left">
            <th className="border-t border-background p-3">Title</th>
            <th className="border-t border-background p-3">Assignee</th>
            <th className="border-t border-background p-3">Start Date</th>
            <th className="border-t border-background p-3">End Date</th>
            <th className="border-t border-background p-3">Status</th>
            <th className="border-t border-background p-3">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task, index) => (
              <tr
                key={index}
                className="hover:bg-secondary cursor-pointer"
                onClick={async () => {
                  dispatch(getTask(task.slug));
                  setOnEditSheet(true);
                }}
              >
                <td className="border-t border-background px-3 py-2">
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
                <td className="border-t border-background px-3 py-2">
                  <div className="flex gap-2 items-center">
                    <div className="w-6 h-6 rounded-full overflow-clip">
                      <Image
                        src={
                          (task.assignee &&
                            typeof task.assignee !== "string" &&
                            (task.assignee.profileImageURL as string)) ||
                          UserAvatar
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </div>
                    <p className="line-clamp-1 max-w-36">
                      <EmployeeNameFromStore
                        employee={task.assignee as EmployeeTypes}
                      />
                    </p>
                  </div>
                </td>
                <td className="border-t border-background px-3 py-2">
                  {format(new Date(task.startDate), "MMM d, yyyy")}
                </td>
                <td className="border-t border-background px-3 py-2">
                  {format(new Date(task.dueDate), "MMM d, yyyy")}
                </td>
                <td className="border-t border-background px-3 py-2 capitalize">
                  {task.status}
                </td>
                <td className="border-t border-background px-3 py-2 capitalize">
                  {task.priority}
                </td>
                {/* Will add later | Tags */}
                {/* <td className="border-t border-background px-3 py-2">
                  {task.tags && task.tags.length > 0 ? task.tags : "-"}
                </td> */}
              </tr>
            ))}
          <tr>
            <td
              className="border-t border-background px-3 py-3 hover:bg-secondary cursor-pointer"
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
