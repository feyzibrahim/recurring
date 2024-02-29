import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from "@/app/lib/features/client/clientActions";

const useClientHook = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<any>();
  const { loading, error } = useAppSelector((state) => state.client);
  const [countryISO, setCountryISO] = useState("");
  const [stateISO, setStateISO] = useState("");

  const addressSchema = z.object({
    street: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    zipCode: z.string().optional(),
  });

  const individualDetails = z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." })
      .optional(),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters." })
      .optional(),
  });
  const companyDetails = z.object({
    companyName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters." })
      .optional(),
    contactPerson: z
      .string()
      .min(2, { message: "Contact person must be at least 2 characters." })
      .optional(),
  });

  const clientSchema = z.object({
    phone: z.string().min(8, { message: "Phone be at least 10 characters." }),
    email: z
      .string()
      .email()
      .min(2, { message: "Email be at least 8 characters." }),
    type: z
      .string()
      .min(2, { message: "Employee Type must be at least 2 characters." }),
    industry: z.string(),
    profileImageURL: z.string().optional(),
    address: addressSchema.optional(),
    individualDetails: individualDetails.optional(),
    companyDetails: companyDetails.optional(),
  });

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      type: "individual",
      phone: "344444444",
      email: "test@gmail.com",
      industry: "Tech",
      address: {
        city: "",
        country: "",
        state: "",
        street: "",
        zipCode: "328237",
      },
    },
  });

  useEffect(() => {
    if (form.watch("type") === "company") {
      form.reset({ ...form.getValues(), individualDetails: undefined });
    }
    if (form.watch("type") === "individual") {
      form.reset({ ...form.getValues(), companyDetails: undefined });
    }
  }, [form, form.watch("type")]);

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

  const onSubmit = async (values: z.infer<typeof clientSchema>) => {
    const profileImageURL = selectedFile && (await photoUpload());
    if (profileImageURL) {
      values.profileImageURL = profileImageURL;
    }
    const res = await dispatch(createClient(values));
    if (createClient.fulfilled.match(res)) {
      router.back();
    }
  };

  return {
    onSubmit,
    form,
    setSelectedFile,
    loading,
    error,
    selectedFile,
    setCountryISO,
    setStateISO,
    countryISO,
    stateISO,
  };
};

export default useClientHook;
