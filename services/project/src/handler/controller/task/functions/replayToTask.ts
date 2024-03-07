import { Request, Response } from "express";
import { TaskUseCaseInterface } from "../../../../interface/task/TaskUseCaseInterface";
import { Replay } from "../../../../Entities/Replay";

export const replayToTask = async (
  req: Request,
  res: Response,
  iTaskUseCase: TaskUseCaseInterface
) => {
  try {
    interface body {
      slug: string;
      noteId: string;
      replay: Replay;
    }

    const { slug, noteId, replay }: body = req.body;

    let updatedTask = await iTaskUseCase.replayToTask(slug, noteId, replay);
    if (!updatedTask) {
      throw Error("No task found");
    }

    return res.status(200).json({
      task: updatedTask,
      success: true,
      message: "Replay successfully Updated",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
