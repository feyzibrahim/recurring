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
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { removeErrorOnClose } from "@/app/lib/features/attendance/attendanceSlice";
import DatePickerLimited from "@/components/custom/DatePickerLimited";
import { createLeave } from "@/app/lib/features/leave/leaveActions";

const formSchema = z.object({
  reason: z.string().min(1, { message: "Reason is required" }),
  startDate: z.date(),
  endDate: z.date(),
});

interface PropsTypes {
  setIsModalOpen: any;
}

export default function LeaveForm({ setIsModalOpen }: PropsTypes) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.attendance);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("file: LeaveForm.tsx:45 -> onSubmit -> values", values);
    const data = await dispatch(createLeave(values));
    if (createLeave.fulfilled.match(data)) {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    return () => {
      dispatch(removeErrorOnClose());
    };
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <DatePickerLimited title="Start Date" field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <DatePickerLimited title="End Date" field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Reason</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter Reason"
                  className="bg-backgroundAccent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Mark Attendance"}
        </Button>
      </form>
    </Form>
  );
}
