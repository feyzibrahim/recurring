"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FiMail, FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, { message: "Username max is 30 characters" }),
    email: z
      .string()
      .email()
      .min(2, {
        message: "Email must be at least 2 characters.",
      })
      .max(30, { message: "Email max is 30 characters" }),
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

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "POST",
      url: "/api/auth/register",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      router.push("/email-validation");
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiUser />}
              placeholder="Your Username"
              showTitle={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<FiMail />}
              placeholder="Your Email"
              showTitle={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Your password"
              type="password"
              showTitle={false}
            />
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormInputWithIcon
              field={field}
              icon={<RiLockPasswordLine />}
              placeholder="Password Again"
              type="password"
              showTitle={false}
            />
          )}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
