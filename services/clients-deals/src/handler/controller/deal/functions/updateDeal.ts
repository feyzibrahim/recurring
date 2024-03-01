import { Request, Response } from "express";
import { DealUseCaseInterface } from "../../../../interface/deal/DealUseCaseInterface";
import { Deal } from "../../../../Entities/Deal";

export const updateDeal = async (
  req: Request,
  res: Response,
  iDealUseCase: DealUseCaseInterface
) => {
  try {
    const { slug } = req.params;

    const body = req.body as Deal;
    body.slug = slug;

    let deal = await iDealUseCase.updateDeal(body);
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
