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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect } from "react";
import { removeErrorOnClose } from "@/app/lib/features/attendance/attendanceSlice";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import { useToast } from "@/components/ui/use-toast";
import { terminateEmployee } from "@/app/lib/features/employee/employeeActions";

const formSchema = z.object({
  terminationReason: z.string().optional(),
});

interface PropsTypes {
  setIsModalOpen: any;
  id: string;
}

export default function TerminationForm({ setIsModalOpen, id }: PropsTypes) {
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.attendance);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      terminationReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await dispatch(terminateEmployee({ data: values, id }));
    if (terminateEmployee.fulfilled.match(data)) {
      setIsModalOpen(false);
      toast({
        title: "Employee Terminated",
        description: "An email is sent to employee with the termination reason",
        variant: "light",
      });
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
          name="terminationReason"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter reason for termination..."
                  className="bg-backgroundAccent h-56"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          variant="destructive"
        >
          {loading ? "Loading..." : "Terminate"}
        </Button>
      </form>
    </Form>
  );
}
