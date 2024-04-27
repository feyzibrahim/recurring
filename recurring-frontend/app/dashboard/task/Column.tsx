"use client";
import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { useEffect } from "react";
import { TaskTypes } from "@/constants/Types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { Button } from "@/components/ui/button";

interface ColumnProps {
  col: {
    id: string;
    list: TaskTypes[];
  };
}

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const [filterKeyword, setFilterKeyword] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "dueDate" | "priority">(
    "title"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredTasks = list.filter((task) => {
    return task.title.toLowerCase().includes(filterKeyword.toLowerCase());
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    let comparison = 0;
    if (sortBy === "dueDate") {
      comparison =
        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === "priority") {
      comparison = a.priority.localeCompare(b.priority);
    } else {
      comparison = a.title.localeCompare(b.title);
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  if (!enabled) {
    return null;
  }

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div>
          <div className="bg-backgroundAccent px-5 py-2 rounded-md capitalize">
            <h1>{id}</h1>
          </div>
          <div className="flex gap-1 mt-1">
            <Input
              type="text"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              placeholder="Filter tasks"
              className="focus-visible:ring-transparent focus-visible:bg-backgroundAccent w-full"
            />
            <Select
              onValueChange={(val: "title" | "dueDate" | "priority") =>
                setSortBy(val)
              }
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={toggleSortDirection} variant="outline">
              {sortDirection === "asc" ? <BsArrowUp /> : <BsArrowDown />}
            </Button>
          </div>
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-96 pt-5"
          >
            {sortedTasks.map((task, index) => (
              <TaskCard key={task._id} task={task} index={index} />
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default Column;
