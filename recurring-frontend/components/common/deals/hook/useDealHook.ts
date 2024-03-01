import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";

import { createDeal } from "@/app/lib/features/deal/dealActions";

const useDealHook = (setIsModalOpen: any) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.deal);

  const dealSchema = z.object({
    title: z.string(),
    description: z.string(),
    amount: z.string(),
    expectedCloseDate: z.string().optional(),
    status: z.string(),
    priority: z.string(),
    client: z.string().optional(),
  });

  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: "Some random Deal",
      description: "344444444",
      amount: "15000",
      status: "",
      priority: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof dealSchema>) => {
    const res = await dispatch(createDeal(values));
    if (createDeal.fulfilled.match(res)) {
      setIsModalOpen(false);
    }
  };

  return {
    onSubmit,
    form,
    loading,
    error,
  };
};

export default useDealHook;
