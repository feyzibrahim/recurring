"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FormInputCustom from "@/components/common/FormInputCustom";
import { Textarea } from "@/components/ui/textarea";
import DatePickerLimited from "@/components/custom/DatePickerLimited";
import { MemberTable } from "./MemberTable";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editMeeting } from "@/app/lib/features/meeting/meetingActions";
import { EmployeeTypes, MeetingTypes } from "@/constants/Types";
import { format } from "date-fns";

const meetingSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2).max(1000),
  type: z.enum(["offline", "online"]),
  location: z.string().optional(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  participants: z.array(z.string()),
});

const EditForm = ({ meeting }: { meeting: MeetingTypes }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.meeting);

  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: meeting.title || "",
      description: meeting.description || "",
      type: meeting.type || "offline",
      location: meeting.location || "",
      date: meeting.date || undefined,
      startTime: format(new Date(meeting.startTime), "hh:mm aa") || undefined,
      endTime: format(new Date(meeting.endTime), "hh:mm aa") || undefined,
      participants: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof meetingSchema>) => {
    dispatch(editMeeting({ data: values, slug: meeting.slug })).then(() => {
      router.back();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-5 mb-5"
      >
        <div className="md:grid grid-cols-4 gap-5">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter meeting title"
                  field={field}
                  showTitle={true}
                  title="Meeting Title"
                />
              )}
            />
            <div className="py-2"></div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Meeting Description"
                      {...field}
                      className="my-2 h-52 bg-backgroundAccent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MemberTable
              membersFromServer={meeting.participants as EmployeeTypes[]}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === "online") {
                        form.setValue("location", "");
                      }
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("type") === "offline" && (
              <>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormInputCustom
                      placeholder="Enter meeting location"
                      field={field}
                      showTitle={true}
                      title="Meeting Location"
                    />
                  )}
                />
                <div className="py-2"></div>
              </>
            )}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <DatePickerLimited title="Date" field={field} />
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  showTitle={true}
                  title="Start Time"
                  type="time"
                  placeholder="Select start time"
                />
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  showTitle={true}
                  title="End Time"
                  type="time"
                  placeholder="Select end time"
                />
              )}
            />
          </div>
        </div>

        <Button type="submit" className="" disabled={loading}>
          {loading ? "Loading..." : "Update Project"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default EditForm;
