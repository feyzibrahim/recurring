import { NextFunction, Request, Response } from "express";
import { validateJwt } from "@recurring/shared_library";
import getAccessToken from "../../util/validation/getAccessToken";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = getAccessToken(req);

    validateJwt(token, process.env.ACCESS_SECRET as string);
    next();
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export { requireAuth };
