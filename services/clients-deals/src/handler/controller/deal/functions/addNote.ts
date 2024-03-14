import { Request, Response } from "express";
import { DealUseCaseInterface } from "../../../../interface/deal/DealUseCaseInterface";
import { Note } from "../../../../Entities/Note";
import { validateJwt } from "@recurring/shared_library";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const addNote = async (
  req: Request,
  res: Response,
  iDealUseCase: DealUseCaseInterface
) => {
  try {
    const { slug } = req.params;
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");

    const body = req.body as Note;
    body.user = data.user;

    let deal = await iDealUseCase.addNote(slug, body);
    if (!deal) {
      throw Error("No deal found");
    }

    return res.status(200).json({
      deal: deal,
      success: true,
      message: "Deal successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
