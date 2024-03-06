import { NextFunction, Request, Response } from "express";
import { validateJwt } from "@recurring/shared_library";

const requireSuperAdminAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token, process.env.ACCESS_SECRET as string);
    if (data.roles !== "super-admin") {
      throw Error("Unauthorized Access");
    }

    next();
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export { requireSuperAdminAccess };
