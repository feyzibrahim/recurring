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
import { useEffect, useState } from "react";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const meetingSchema = z.object({
  title: z.string().min(2).max(30),
  description: z.string().min(2).max(1000),
  type: z.enum(["offline", "online"]),
  location: z.string().optional(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  participants: z.array(z.string()),
});

const EditForm = ({ slug }: { slug: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [meeting, setMeeting] = useState<MeetingTypes>();

  const { loading, error } = useAppSelector((state) => state.meeting);

  useEffect(() => {
    const loadData = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.CHAT,
        method: "GET",
        url: `/api/meeting/${slug}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.success) {
        setMeeting(res.meeting);
      }
    };
    loadData();
  }, []);

  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: meeting ? meeting.title : "",
      description: meeting ? meeting.description : "",
      type: meeting ? meeting.type : "offline",
      location: meeting ? meeting.location : "",
      date: meeting ? meeting.date : "",
      startTime: meeting ? meeting.startTime : "",
      endTime: meeting ? meeting.endTime : "",
      participants: meeting ? meeting.participants.map((part) => part._id) : [],
    },
  });

  const onSubmit = async (values: z.infer<typeof meetingSchema>) => {
    dispatch(editMeeting({ data: values, slug: slug })).then(() => {
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
            {meeting && (
              <MemberTable
                membersFromServer={meeting.participants as EmployeeTypes[]}
              />
            )}
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
          {loading ? "Loading..." : "Update Meeting"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default EditForm;
