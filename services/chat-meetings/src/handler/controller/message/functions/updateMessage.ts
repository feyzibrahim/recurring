import { Request, Response } from "express";
import { ChatUseCaseInterface } from "../../../../interface/chat/ChatUseCaseInterface";
import { Chat } from "../../../../Entities/Chat";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const updateChat = async (
  req: Request,
  res: Response,
  iChatUseCase: ChatUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);
    const chat = req.body as Chat;

    let updatedChat = await iChatUseCase.updateChat(data.user, chat);
    if (!updatedChat) {
      throw Error("No chat found");
    }

    return res.status(200).json({
      chat: updatedChat,
      success: true,
      message: "Chat successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
