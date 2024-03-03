import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { addNoteToDeal } from "@/app/lib/features/deal/dealActions";

const useNoteCreateHook = (setIsModalOpen: any, slug: string) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.deal);

  const dealSchema = z.object({
    content: z.string(),
  });

  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof dealSchema>) => {
    console.log("file: useNoteCreateHook.ts:25 -> onSubmit -> values", values);
    const res = await dispatch(addNoteToDeal({ data: values, slug }));
    if (addNoteToDeal.fulfilled.match(res)) {
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

export default useNoteCreateHook;
