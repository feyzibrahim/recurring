import { Request, Response } from "express";
import { ClientUseCaseInterface } from "../../../../interface/client/ClientUseCaseInterface";

export const getClient = async (
  req: Request,
  res: Response,
  iClientUseCase: ClientUseCaseInterface
) => {
  try {
    const { slug } = req.params;

    let client = await iClientUseCase.getClient(slug);
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
