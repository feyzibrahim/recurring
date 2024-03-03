import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";

import { editDeal } from "@/app/lib/features/deal/dealActions";

const useDealHook = (setIsModalOpen: any, slug: string) => {
  const dispatch = useAppDispatch();
  const { deal, loading, error } = useAppSelector((state) => state.deal);

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
      title: deal?.title ?? "",
      description: deal?.description ?? "",
      amount: deal?.amount.toString() ?? "",
      status: deal?.status ?? "",
      priority: deal?.priority ?? "",
      expectedCloseDate: deal?.expectedCloseDate.toString() ?? undefined,
      client: deal?.client?._id.toString() ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof dealSchema>) => {
    const res = await dispatch(editDeal({ data: values, slug }));
    if (editDeal.fulfilled.match(res)) {
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
