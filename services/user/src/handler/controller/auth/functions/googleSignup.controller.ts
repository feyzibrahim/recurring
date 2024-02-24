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

export const googleSignup = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
) => {
  const body: any = req.body;

  try {
    const data = await validateUserOnGoogleAuth(body);
    const temp = {
      email: data?.email,
      firstName: data?.name,
      profileImageURL: data?.picture,
      isEmailVerified: true,
    };

    let user: User | boolean = await iAuthUseCase.fetchUserWithEmail(
      temp.email as string
    );

    if (!user) {
      user = await iAuthUseCase.signup(temp as User);
    }

    iRabbitMQUseCase.sendDataToQueue(QUEUES.EMPLOYEECREATION, user);
    iRabbitMQUseCase.sendDataToQueue(QUEUES.PROJECT_USER_CREATION, user);
    iRabbitMQUseCase.sendDataToQueue(QUEUES.CHAT_MEETING_USER_CREATION, user);

    let tempUser = user as User;

    const payload: JWTPayload = {
      user: tempUser._id,
      role: tempUser.role,
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
