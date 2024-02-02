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
import DatePickerLimited from "@/components/custom/DatePickerLimited";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PhotoUpload from "./PhotoUpload";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { createEmployee } from "@/app/lib/features/employee/employeeActions";
import { actualCommonRequest } from "@/api/actual_client";
import { API_ROUTES } from "@/lib/routes";

const checkCredentials = async ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  const res = await actualCommonRequest({
    route: API_ROUTES.AUTH,
    method: "GET",
    url: `/api/auth/check-credintials?${key}=${value}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.user;
};

const addressSchema = z.object({
  street: z
    .string()
    .min(2, { message: "Street must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
  zipCode: z.string(),
});

const projectSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(8, { message: "Phone Number be at least 8 characters." })
    .superRefine(async (data, ctx) => {
      const isUserName = await checkCredentials({
        key: "phoneNumber",
        value: data,
      });
      if (isUserName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number Already Exists",
        });
      }
    }),
  email: z
    .string()
    .email()
    .min(2, { message: "Email be at least 8 characters." })
    .superRefine(async (data, ctx) => {
      const isEmailExists = await checkCredentials({
        key: "email",
        value: data,
      });
      if (isEmailExists) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email Already Exists",
        });
      }
    }),
  username: z
    .string()
    .min(2, { message: "Email be at least 8 characters." })
    .superRefine(async (data, ctx) => {
      const isUserName = await checkCredentials({
        key: "username",
        value: data,
      });
      if (isUserName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Username Already Exists",
        });
      }
    }),
  employeeType: z
    .string()
    .min(2, { message: "Employee Type must be at least 2 characters." }),
  designation: z
    .string()
    .min(2, { message: "Designation must be at least 2 characters." }),
  salary: z.string(),
  hiringDate: z.date(),

  gender: z
    .string()
    .min(2, { message: "Gender must be at least 2 characters." }),
  address: addressSchema,
});

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.employee);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      firstName: "test",
      lastName: "test",
      role: "employee",
      phoneNumber: "344444444",
      username: "test",
      email: "test@gmail.com",
      employeeType: "fulltime",
      gender: "male",
      designation: "test",
      salary: "20000",
      hiringDate: new Date("01/01/2024"),
      address: {
        city: "tesafsadt",
        country: "test",
        state: "test",
        street: "test",
        zipCode: "328237",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    await dispatch(createEmployee(values)).then(() => {
      router.back();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="md:grid grid-cols-4 gap-10">
          <div>
            <PhotoUpload />
            <FormField
              control={form.control}
              name="hiringDate"
              render={({ field }) => (
                <DatePickerLimited title="Hiring Date" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormInputCustom
                  type="number"
                  placeholder="Enter Salary"
                  field={field}
                  showTitle={true}
                  title="Salary"
                />
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employeeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employee Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select Employee Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fulltime">Fulltime</SelectItem>
                      <SelectItem value="partTime">Part Time</SelectItem>
                      <SelectItem value="intern">Intern</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-backgroundAccent">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter First Name"
                    field={field}
                    showTitle={true}
                    title="First Name"
                  />
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormInputCustom
                    placeholder="Enter Last Name"
                    field={field}
                    showTitle={true}
                    title="Last Name"
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Phone Number"
                  field={field}
                  showTitle={true}
                  title="Phone Number"
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Email"
                  field={field}
                  showTitle={true}
                  title="Email"
                />
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Username"
                  field={field}
                  showTitle={true}
                  title="Username"
                />
              )}
            />
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Enter your organization street"
                  title="Street"
                  showTitle={true}
                />
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormInputCustom
                    field={field}
                    placeholder="Enter your organization city"
                    title="City"
                    showTitle={true}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormInputCustom
                    field={field}
                    placeholder="Enter your organization state"
                    title="State"
                    showTitle={true}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormInputCustom
                    field={field}
                    placeholder="Enter your organization country"
                    title="Country"
                    showTitle={true}
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormInputCustom
                  field={field}
                  placeholder="Enter your organization zipCode"
                  title="Zip Code"
                  showTitle={true}
                />
              )}
            />
            <Button type="submit" className="mt-3">
              {loading ? "Loading..." : "Add Employee"}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateForm;
