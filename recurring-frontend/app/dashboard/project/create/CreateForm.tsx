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
import { ManagerList } from "./ManagerList";
import { MemberTable } from "./MemberTable";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { createProject } from "@/app/lib/features/project/projectActions";

const projectSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  startDate: z.date(),
  // tasks: z.array(z.string()),
  endDate: z.date(),
  members: z.array(z.string()),
  // status: z
  //   .string()
  //   .refine((status) =>
  //     ["planning", "active", "completed", "archive", "backlog"].includes(status)
  //   ),
  description: z.string().optional(),
  manager: z.string(),
  // client: z.string().optional(),
  // deal: z.string().optional(),
});

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.project);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      startDate: undefined,
      // tasks: [],
      endDate: undefined,
      members: [],
      // status: "",
      description: "",
      manager: "",
      // client: "",
      // deal: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    dispatch(createProject(values)).then(() => {
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
              name="name"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Project Name"
                  field={field}
                  showTitle={true}
                  title="Project Name"
                />
              )}
            />
            <div className="py-2"></div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Project Description"
                      {...field}
                      className="my-2 h-52 bg-backgroundAccent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <MemberTable />
          </div>
          <div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <DatePickerLimited title="Start Date" field={field} />
              )}
            />
            <div className="py-2"></div>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <DatePickerLimited title="End Date" field={field} />
              )}
            />
            <div className="py-2"></div>
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Choose Manager</FormLabel>
                  <ManagerList field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="" disabled={loading}>
          {loading ? "Loading..." : "Create Project"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default CreateForm;
