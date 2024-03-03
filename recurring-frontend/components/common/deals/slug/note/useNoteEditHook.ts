import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "@/app/lib/hook";
import { editNoteToDeal } from "@/app/lib/features/deal/dealActions";
import { NoteTypes } from "@/constants/Types";

const useNoteEditHook = (
  setIsModalOpen: any,
  slug: string,
  note: NoteTypes
) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.deal);

  const dealSchema = z.object({
    _id: z.string(),
    content: z.string(),
  });

  const form = useForm<z.infer<typeof dealSchema>>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      _id: note._id ?? "",
      content: note.content ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof dealSchema>) => {
    const res = await dispatch(editNoteToDeal({ data: values, slug }));
    if (editNoteToDeal.fulfilled.match(res)) {
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

export default useNoteEditHook;
