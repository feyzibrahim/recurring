"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import FormInputWithIcon from "@/components/common/FormInputWithIcon";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import DatePicker from "@/components/custom/DatePicker";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";
import PhotoUpload from "@/components/common/PhotoUpload";
import { photoUpload } from "@/util/functions";
import { UserContext } from "@/components/common/chat/UserProvider/UserContextProvider";
import DatePickerString from "@/components/custom/DatePickerString";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  lastName: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  username: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  phoneNumber: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  dateOfBirth: z.string(),
  role: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .max(30, { message: "Name should be Less than 30 characters" }),
  profileImageURL: z.string().optional(),
});

export default function ProfileChangeForm({
  setIsModalOpen,
}: {
  setIsModalOpen: any;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>();

  const { user } = useContext(UserContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: (user && user.firstName) || "",
      lastName: (user && user.lastName) || "",
      username: (user && user.username) || "",
      phoneNumber: user ? user.phoneNumber.toString() : "",
      dateOfBirth: (user && user.dateOfBirth?.toString()) || undefined,
      role: (user && user.role) || "",
      profileImageURL: (user && user.profileImageURL) || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const profileImageURL = selectedFile && (await photoUpload(selectedFile));
    values.profileImageURL = profileImageURL;

    let res = await actualCommonRequest({
      route: API_ROUTES.AUTH,
      method: "PATCH",
      url: "/api/user/update-profile",
      data: { ...values },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.success) {
      setError(res.error);
    }

    if (res.success) {
      router.refresh();
      setIsModalOpen(false);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 space-x-5"
      >
        <PhotoUpload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          // size="20"
        />

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<FiUser />}
                placeholder="Enter your first name"
                title="First Name"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<FiUser />}
                placeholder="Enter your last name"
                title="Last Name"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<RiLockPasswordLine />}
                placeholder="Enter your username"
                title="Username"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormInputWithIcon
                field={field}
                icon={<RiLockPasswordLine />}
                placeholder="Enter your phone number"
                title="Phone Number"
                showTitle={true}
              />
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <DatePickerString title="Date of Birth" field={field} />
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Update Details"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </form>
    </Form>
  );
}
