import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { editActivityToDeal } from "@/app/lib/features/deal/dealActions";
import { ActivityTypes } from "@/constants/Types";

const useActivityEditHook = (
  setIsModalOpen: any,
  slug: string,
  activity: ActivityTypes
) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.deal);

  const dealSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      _id: activity._id ?? "",
      title: activity.title ?? "",
      description: activity.description ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof dealSchema>) => {
    const res = await dispatch(editActivityToDeal({ data: values, slug }));
    if (editActivityToDeal.fulfilled.match(res)) {
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

export default useActivityEditHook;
