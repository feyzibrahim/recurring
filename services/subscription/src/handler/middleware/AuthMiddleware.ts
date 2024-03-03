import { validateJwt } from "@recurring/shared_library";
import { NextFunction, Request, Response } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.cookies;

    console.log(
      "file: AuthMiddleware.ts:13 -> requireAuth -> process.env.ACCESS_SECRET",
      process.env.ACCESS_SECRET
    );
    validateJwt(access_token, process.env.ACCESS_SECRET as string);
    next();
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export { requireAuth };
