import { Note } from "../../../../../Entities/Note";
import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const addNote = async (slug: string, note: Note) => {
  try {
    await DealModal.updateOne({ slug: slug }, { $push: { note: note } });

    const newDeal = await DealModal.findOne({ slug: slug }).populate(
      "client",
      "details"
    );
    return newDeal as Deal;
  } catch (error) {
    console.log("DealAdapter: addNote -> error", error);
    return false;
  }
};
