import { Note } from "../../../../../Entities/Note";
import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const editNote = async (slug: string, note: Note) => {
  try {
    await DealModal.updateOne(
      { slug: slug, "note._id": note._id },
      {
        $set: {
          "note.$.content": note.content,
        },
      }
    );

    const newDeal = await DealModal.findOne({ slug: slug }).populate(
      "client",
      "details"
    );
    return newDeal as Deal;
  } catch (error) {
    console.log("DealAdapter: editNote -> error", error);
    return false;
  }
};
