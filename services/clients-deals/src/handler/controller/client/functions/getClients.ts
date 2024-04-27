import { Request, Response } from "express";
import { ClientUseCaseInterface } from "../../../../interface/client/ClientUseCaseInterface";
import { validateJwt } from "@recurring/shared_library";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getClients = async (
  req: Request,
  res: Response,
  iClientUseCase: ClientUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");

    let clients = await iClientUseCase.getClients(data.organization);
    if (!clients) {
      throw Error("No clients found");
    }

    return res.status(200).json({
      clients: clients,
      success: true,
      message: "Client successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
