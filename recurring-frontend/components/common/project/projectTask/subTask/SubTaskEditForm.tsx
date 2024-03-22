"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { editTask } from "@/app/lib/features/task/taskActions";
import FormInputCustom from "@/components/common/FormInputCustom";
import { SubTaskTypes } from "@/constants/Types";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  _id: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  title: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  status: z.string(),
  duration: z
    .object({
      length: z
        .number()
        .min(0, { message: "Duration must be a positive number." })
        .optional(),
      durationType: z.string().optional(),
    })
    .optional(),
});

export default function SubTaskEditForm({
  setIsModalOpen,
  subTaskSlug,
}: {
  setIsModalOpen: any;
  subTaskSlug: string;
}) {
  const dispatch = useAppDispatch();

  const { task, loading, error } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: task?.subTasks.find((ele) => ele._id === subTaskSlug)?._id || "",
      title: task?.subTasks.find((ele) => ele._id === subTaskSlug)?.title || "",
      status:
        task?.subTasks.find((ele) => ele._id === subTaskSlug)?.status || "",
      duration: {
        durationType:
          task?.subTasks.find((ele) => ele._id === subTaskSlug)?.duration
            .durationType || "",
        length:
          task?.subTasks.find((ele) => ele._id === subTaskSlug)?.duration
            .length || undefined,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let val = values as SubTaskTypes;
    if (task) {
      const index = task.subTasks.findIndex((ele) => ele._id === subTaskSlug);

      let subTasks = [...task.subTasks];
      subTasks[index] = val;

      const data = await dispatch(
        editTask({ data: { subTasks: subTasks }, slug: task._id })
      );
      if (editTask.fulfilled.match(data)) {
        setIsModalOpen(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              placeholder="Enter sub task title"
              title="Title"
              showTitle={true}
            />
          )}
        />
        <div className="w-full">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-backgroundAccent">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="backlog">Backlog</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormLabel>Estimated Duration</FormLabel>
        <FormField
          control={form.control}
          name="duration.durationType"
          render={({ field }) => (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-backgroundAccent">
                  <SelectValue
                    className="capitalize"
                    placeholder="Select Duration Type"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          )}
        />
        <FormField
          control={form.control}
          name="duration.length"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <Input
                  placeholder="Enter duration"
                  type="number"
                  min="0"
                  {...field}
                  className="bg-backgroundAccent"
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="py-1"></div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Update Sub Task"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
}
