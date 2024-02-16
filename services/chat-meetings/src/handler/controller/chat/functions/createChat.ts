import { Request, Response } from "express";
import { ChatUseCaseInterface } from "../../../../interface/chat/ChatUseCaseInterface";
import { Chat } from "../../../../Entities/Chat";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const createChat = async (
  req: Request,
  res: Response,
  iChatUseCase: ChatUseCaseInterface
) => {
  try {
    let body = req.body as Chat;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    body.organization = data.organization;
    body.participants.push(data.user);
    console.log("file: createChat.ts:31 -> body", body);

    let chat = (await iChatUseCase.createChat(body)) as Chat;

    return res.status(200).json({
      chat: chat,
      success: true,
      message: "Chat successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
