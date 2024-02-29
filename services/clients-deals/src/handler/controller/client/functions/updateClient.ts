import { Request, Response } from "express";
import { ClientUseCaseInterface } from "../../../../interface/client/ClientUseCaseInterface";
import { Client } from "../../../../Entities/Client";

export const updateClient = async (
  req: Request,
  res: Response,
  iClientUseCase: ClientUseCaseInterface
) => {
  try {
    const { slug } = req.params;

    const body = req.body as Client;
    body.slug = slug;

    let client = await iClientUseCase.updateClient(body);
    if (!client) {
      throw Error("No client found");
    }

    return res.status(200).json({
      client: client,
      success: true,
      message: "Client successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
