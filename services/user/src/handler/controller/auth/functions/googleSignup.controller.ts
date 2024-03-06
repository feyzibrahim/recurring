import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import validateUserOnGoogleAuth from "../../../../util/google/validate.google";
import {
  JWTPayload,
  createJwtAccessToken,
  createJwtRefreshToken,
} from "@recurring/shared_library";
import cookieConfig from "../../../../constants/cookieConfig";
import { QUEUES } from "../../../../constants/types/queue";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";

export const googleSignup = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface,
  iOrgUseCase: OrganizationUseCaseInterface
) => {
  const body: any = req.body;

  try {
    const data = await validateUserOnGoogleAuth(body);
    const temp = {
      email: data?.email,
      firstName: data?.name,
      profileImageURL: data?.picture,
      isEmailVerified: true,
      username: `${data?.name?.split(" ").join("")}${
        Math.floor(Math.random() * 90000) + 10000
      }`,
    };

    let user: User | boolean = await iAuthUseCase.fetchUserWithEmail(
      temp.email as string
    );

    let tempUser = user as User;

    if (!user) {
      user = await iAuthUseCase.signup(temp as User);
      if (typeof user !== "boolean") {
        const orgDetails = {
          admin: user._id,
        };
        let organization = await iOrgUseCase.createOrganization(
          orgDetails as Organization
        );
        if (typeof organization !== "boolean") {
          tempUser.organization = organization._id;
        }
      }
    }
    console.log("file: googleSignup.controller.ts:42 -> tempUser", tempUser);

    iRabbitMQUseCase.sendDataToQueue(QUEUES.EMPLOYEECREATION, user);
    iRabbitMQUseCase.sendDataToQueue(QUEUES.PROJECT_USER_CREATION, user);
    iRabbitMQUseCase.sendDataToQueue(QUEUES.CHAT_MEETING_USER_CREATION, user);

    const payload: JWTPayload = {
      user: tempUser._id,
      roles: tempUser.role,
      organization: tempUser.organization,
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
      user: user,
      success: true,
      message: "Users successfully Registered",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
