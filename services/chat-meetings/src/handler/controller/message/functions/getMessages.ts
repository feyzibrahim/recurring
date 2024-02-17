import { Request, Response } from "express";
import { MessageUseCaseInterface } from "../../../../interface/message/MessageUseCaseInterface";

export const getMessages = async (
  req: Request,
  res: Response,
  iMessageUseCAse: MessageUseCaseInterface
) => {
  try {
    const { chatId } = req.params;

    let messages = await iMessageUseCAse.getMessages(chatId);
    if (!messages) {
      throw Error("No message found");
    }

    return res.status(200).json({
      messages: messages,
      success: true,
      message: "Messages successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
