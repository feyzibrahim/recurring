import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { addActivityToDeal } from "@/app/lib/features/deal/dealActions";

const useActivityCreateHook = (setIsModalOpen: any, slug: string) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.deal);

  const dealSchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof dealSchema>) => {
    console.log(
      "file: useActivityCreateHook.ts:25 -> onSubmit -> values",
      values
    );
    const res = await dispatch(addActivityToDeal({ data: values, slug }));
    if (addActivityToDeal.fulfilled.match(res)) {
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

export default useActivityCreateHook;
