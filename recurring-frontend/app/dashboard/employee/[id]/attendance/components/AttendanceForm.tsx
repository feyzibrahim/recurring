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
} from "@/components/ui/form";
import FormInputCustom from "@/components/common/FormInputCustom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { createAttendanceByAdmin } from "@/app/lib/features/attendance/attendanceActions";
import { useEffect } from "react";
import { removeErrorOnClose } from "@/app/lib/features/attendance/attendanceSlice";
import DatePicker from "@/components/custom/DatePicker";

const formSchema = z.object({
  employeeId: z.string(),
  date: z.date(),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  status: z.string(),
  remarks: z.string().optional(),
});

export default function AttendanceForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.attendance);

  let id = "";
  const parts = pathName.split("/");
  const idIndex = parts.indexOf("employee") + 1;
  if (parts.length > idIndex) {
    id = parts[idIndex];
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: id || "",
      date: undefined,
      checkInTime: "",
      checkOutTime: "",
      status: "",
      remarks: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await dispatch(createAttendanceByAdmin(values));
    if (createAttendanceByAdmin.fulfilled.match(data)) {
      console.log("file: AttendanceForm.tsx:66 -> onSubmit -> data", data);
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
          name="date"
          render={({ field }) => <DatePicker title="Date" field={field} />}
        />
        <FormField
          control={form.control}
          name="checkInTime"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              showTitle={true}
              title="Check-In Time"
              type="time"
              placeholder="Check-In Time"
            />
          )}
        />
        <FormField
          control={form.control}
          name="checkOutTime"
          render={({ field }) => (
            <FormInputCustom
              field={field}
              showTitle={true}
              title="Check-In Time"
              type="time"
              placeholder="Check-Out Time"
            />
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-backgroundAccent">
                    <SelectValue placeholder="Choose Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="half-day">Half-day</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
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
          {loading ? "Loading..." : "Update Attendance"}
        </Button>
      </form>
    </Form>
  );
}
