import { Request, Response } from "express";
import { DealUseCaseInterface } from "../../../../interface/deal/DealUseCaseInterface";
import { Deal } from "../../../../Entities/Deal";
import { validateJwt } from "@recurring/shared_library";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createDeal = async (
  req: Request,
  res: Response,
  iDealUseCase: DealUseCaseInterface
) => {
  try {
    let body = req.body as Deal;

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");
    body.organization = data.organization;
    body.createdBy = data.user;

    let newDeal = (await iDealUseCase.createDeal(body)) as Deal;

    return res.status(200).json({
      deal: newDeal,
      success: true,
      message: "Deal successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
