import { Request, Response } from "express";
import { ChatUseCaseInterface } from "../../../../interface/chat/ChatUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getChats = async (
  req: Request,
  res: Response,
  iChatUseCAse: ChatUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    let chats = await iChatUseCAse.getChats(data.user);
    if (!chats) {
      throw Error("No chat found");
    }

    return res.status(200).json({
      chats: chats,
      success: true,
      message: "Chats successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
