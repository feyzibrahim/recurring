"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";

const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z.object({
  username: z
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
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
              icon={<FiMail />}
              placeholder="Your Email"
              title="Username"
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
              title="Password"
              type="password"
              showTitle={false}
            />
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
}
