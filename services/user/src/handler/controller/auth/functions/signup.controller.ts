import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import {
  JWTPayload,
  createJwtAccessToken,
  createJwtRefreshToken,
} from "@recurring/shared_library";
import validateUser from "../../../../util/validation/signup.validate";
import hashPassword from "../../../../util/hash/password.hash";
import { sendVerificationLink } from "../../../../util/nodemailer/sendVerificationLink";
import cookieConfig from "../../../../constants/cookieConfig";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";

export const signup = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  const userData: any = req.body;

  try {
    // Validate Password
    let user = await validateUser(userData, iAuthUseCase);

    // Hash Password
    user = await hashPassword(user);

    // Registering User to DB
    const newUser: User | boolean = await iAuthUseCase.signup(user);

    if (!newUser) {
      throw new Error("Cannot Signup Now! Please try Later");
    }

    await sendVerificationLink(newUser as User);

    let tempUser = newUser as User;

    const orgDetails = {
      admin: tempUser._id,
    };
    const organization = await iOrgUseCase.createOrganization(
      orgDetails as Organization
    );

    if (!organization) {
      throw Error("Cannot Create Organization");
    }

    // Setting JWT Tokens
    const payload: JWTPayload = {
      user: tempUser._id,
      role: tempUser.role,
      organization: typeof organization !== "boolean" ? organization._id : "",
    };

    // Setting JWT Tokens
    const access_token = createJwtAccessToken(
      payload,
      process.env.ACCESS_SECRET as string
    );
    const refresh_token = createJwtRefreshToken(
      payload,
      process.env.REFRESH_SECRET as string
    );
    res.cookie("access_token", access_token, cookieConfig);
    res.cookie("refresh_token", refresh_token, cookieConfig);

    return res.status(200).json({
      user: newUser,
      success: true,
      message: "Users successfully Registered",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
