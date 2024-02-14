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
import { createAttendance } from "@/app/lib/features/attendance/attendanceActions";
import { useEffect } from "react";
import { removeErrorOnClose } from "@/app/lib/features/attendance/attendanceSlice";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  type: z.string(),
  remarks: z.string().optional(),
});

interface PropsTypes {
  setIsModalOpen: any;
}

export default function AttendanceForm({ setIsModalOpen }: PropsTypes) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.attendance);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      remarks: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await dispatch(createAttendance(values));
    if (createAttendance.fulfilled.match(data)) {
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
        <div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="check-in" />
                      </FormControl>
                      <FormLabel className="font-normal">Check-In</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="check-out" />
                      </FormControl>
                      <FormLabel className="font-normal">Check-Out</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Enter Remarks"
              className="bg-backgroundAccent"
            />
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
