import { Request, Response } from "express";
import { ChatUseCaseInterface } from "../../../../interface/chat/ChatUseCaseInterface";

export const getChat = async (
  req: Request,
  res: Response,
  iChatUseCAse: ChatUseCaseInterface
) => {
  try {
    const { id } = req.params;

    let chat = await iChatUseCAse.getChat(id);
    if (!chat) {
      throw Error("No chat found");
    }

    return res.status(200).json({
      chat: chat,
      success: true,
      message: "Chat successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
