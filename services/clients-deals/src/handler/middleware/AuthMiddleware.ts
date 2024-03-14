import { validateJwt } from "@recurring/shared_library";
import { NextFunction, Request, Response } from "express";
import getAccessToken from "../../util/validation/getAccessToken";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const access_token = getAccessToken(req);

    validateJwt(access_token, process.env.ACCESS_SECRET ?? "");
    next();
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export { requireAuth };
