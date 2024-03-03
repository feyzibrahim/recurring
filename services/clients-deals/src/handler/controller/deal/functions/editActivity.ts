import { Request, Response } from "express";
import { DealUseCaseInterface } from "../../../../interface/deal/DealUseCaseInterface";
import { Activity } from "../../../../Entities/Activity";

export const editActivity = async (
  req: Request,
  res: Response,
  iDealUseCase: DealUseCaseInterface
) => {
  try {
    const { slug } = req.params;
    const body = req.body as Activity;

    let deal = await iDealUseCase.editActivity(slug, body);
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
