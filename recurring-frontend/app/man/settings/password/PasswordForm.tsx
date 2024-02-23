"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLock } from "react-icons/ai";
import { useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z
  .object({
    oldPassword: z.string().refine((value) => strongPassword.test(value), {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    password: z.string().refine((value) => strongPassword.test(value), {
      message:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

const PasswordForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    setLoading(true);
    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "PATCH",
      url: "/user/change-password",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      toast({
        title: "Password Changed",
        description: "Use your new password to login again",
        variant: "light",
      });
      form.reset();
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:w-1/2">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<AiOutlineLock />}
                placeholder="Enter your old password"
                title="Old Password"
                showTitle={true}
                type="password"
              />
            )}
          />
        </div>
        <div className="md:w-1/2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<AiOutlineLock />}
                placeholder="Enter your New password"
                title="New Password"
                showTitle={true}
                type="password"
              />
            )}
          />
        </div>
        <div className="md:w-1/2">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<AiOutlineLock />}
                placeholder="Confirm your New password"
                title="Confirm Password Password"
                showTitle={true}
                type="password"
              />
            )}
          />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full md:w-1/2" disabled={loading}>
              {loading ? "Loading..." : "Change Password"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Password Change?</AlertDialogTitle>
              <AlertDialogDescription>
                Don&apos;t forget the new password!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction onClick={() => form.handleSubmit(onSubmit)()}>
                Yes!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </Form>
  );
};

export default PasswordForm;
