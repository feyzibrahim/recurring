import { Replay } from "../../../../../Entities/Replay";
import { Task } from "../../../../../Entities/Task";
import TaskModel from "../../Modal/TaskModel";

export const replayToTask = async (
  slug: string,
  noteId: string,
  replay: Replay
) => {
  console.log("file: replayToTask.adapter.ts:5 -> replayToTask -> slug", slug);
  try {
    const task = await TaskModel.findOne({ slug });

    if (!task) {
      throw Error("Invalid Slug");
    }

    if (task.notes) {
      const noteIndex = task.notes.findIndex(
        (note) => note._id.toString() === noteId
      );
      if (noteIndex === -1) {
        throw Error("Note not found");
      }
      task.notes[noteIndex].replay.push(replay);
      await task.save();
    }

    const populatedTask = await TaskModel.findOne({ slug: slug })
      .populate("project")
      .populate("assignee")
      .populate("notes.user")
      .populate({ path: "notes.replay", populate: { path: "user" } });

    return populatedTask as Task;
  } catch (error) {
    console.log("TaskAdapter: replayToTask -> error", error);
    return false;
  }
};
