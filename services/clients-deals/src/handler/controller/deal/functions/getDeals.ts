import { Request, Response } from "express";
import { DealUseCaseInterface } from "../../../../interface/deal/DealUseCaseInterface";
import { validateJwt } from "@recurring/shared_library";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getDeals = async (
  req: Request,
  res: Response,
  iDealUseCase: DealUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");

    let deals = await iDealUseCase.getDeals(data.organization);
    if (!deals) {
      throw Error("No deals found");
    }

    return res.status(200).json({
      deals: deals,
      success: true,
      message: "Deal successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
