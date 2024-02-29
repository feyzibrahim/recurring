import { Request, Response } from "express";
import { ClientUseCaseInterface } from "../../../../interface/client/ClientUseCaseInterface";
import { Client } from "../../../../Entities/Client";
import { validateJwt } from "@recurring/shared_library";

export const createClient = async (
  req: Request,
  res: Response,
  iClientUseCase: ClientUseCaseInterface
) => {
  try {
    let body = req.body as Client;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token, process.env.ACCESS_SECRET ?? "");
    body.organization = data.organization;

    let newClient = (await iClientUseCase.createClient(body)) as Client;

    return res.status(200).json({
      client: newClient,
      success: true,
      message: "Client successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
