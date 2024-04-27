"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { RiLockPasswordLine } from "react-icons/ri";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import { storeObject } from "@/util/localStorage";

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z
  .object({
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

const PasswordResetForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "Faiz@1234",
      confirmPassword: "Faiz@1234",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "POST",
      url: `/api/auth/reset-password/${token}`,
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      storeObject("user_data", {
        ...res.user,
        access_token: res.access_token,
        refresh_token: res.refresh_token,
      });

      if (res.user.role === "owner") {
        router.replace("/dashboard");
      }
      if (res.user.role === "employee") {
        router.replace("/home");
      }
      if (res.user.role === "manager") {
        router.replace("/man");
      }
      if (res.user.role === "super-admin") {
        router.replace("/super-admin");
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    const verifyToken = async () => {
      const res = await actualCommonRequest({
        route: API_ROUTES.AUTH,
        method: "GET",
        url: `/api/auth/verify-password-link/${token}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.success) {
        router.replace("/link-expired");
      }
    };
    verifyToken();
  }, [router, token]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
};

export default PasswordResetForm;
