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
import PhotoUpload from "@/components/common/PhotoUpload";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { editEmployee } from "@/app/lib/features/employee/employeeActions";
import { useState } from "react";
import axios from "axios";

const addressSchema = z.object({
  street: z
    .string()
    .min(2, { message: "Street must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters." }),
  zipCode: z
    .string()
    .min(2, { message: "Designation must be at least 2 characters." }),
});

const projectSchema = z.object({
  _id: z.string(),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(8, { message: "Phone Number be at least 8 characters." }),
  email: z
    .string()
    .email()
    .min(2, { message: "Email be at least 8 characters." }),
  username: z.string().min(2, { message: "Email be at least 8 characters." }),
  employeeType: z
    .string()
    .min(2, { message: "Employee Type must be at least 2 characters." }),
  designation: z
    .string()
    .min(2, { message: "Designation must be at least 2 characters." }),
  salary: z.string(),
  hiringDate: z.date(),
  profileImageURL: z.string().optional(),
  gender: z
    .string()
    .min(2, { message: "Gender must be at least 2 characters." }),
  address: addressSchema,
});

const EditForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<any>();
  const { employee, loading, error } = useAppSelector(
    (state) => state.employee
  );

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      _id: employee?._id,
      firstName: (employee && employee.firstName) || "",
      lastName: (employee && employee.lastName) || "",
      role: (employee && employee.role) || "",
      phoneNumber: (employee && employee.phoneNumber.toString()) || "",
      username: (employee && employee.username) || "",
      email: (employee && employee.email) || "",
      employeeType: (employee && employee.employeeType) || "",
      gender: (employee && employee.gender) || "",
      designation: (employee && employee.designation) || "",
      salary: (employee && employee.salary && employee.salary.toString()) || "",
      hiringDate:
        (employee && employee.hiringDate && new Date(employee?.hiringDate)) ||
        undefined,
      address: {
        city: (employee && employee.address?.city) || "",
        country: (employee && employee.address?.country) || "",
        state: (employee && employee.address?.state) || "",
        street: (employee && employee.address?.street) || "",
        zipCode: (employee && employee.address?.zipCode) || "",
      },
    },
  });

  const photoUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values: z.infer<typeof projectSchema>) => {
    const profileImageURL = selectedFile && (await photoUpload());
    if (profileImageURL) {
      values.profileImageURL = profileImageURL;
    }
    await dispatch(editEmployee(values)).then(() => {
      router.push("/dashboard/employee");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-5">
        <div className="md:grid grid-cols-4 gap-10">
          <div>
            <PhotoUpload
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
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
              name="designation"
              render={({ field }) => (
                <FormInputCustom
                  placeholder="Enter Designation"
                  field={field}
                  showTitle={true}
                  title="Designation"
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
              {loading ? "Loading..." : "Update Employee"}
            </Button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
