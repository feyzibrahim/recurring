import { NextFunction, Request, Response } from "express";
import { validateJwt } from "../../util/JWT/validate.jwt";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);
    next();
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export { requireAuth };
