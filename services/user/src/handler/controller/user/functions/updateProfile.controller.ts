import { Request, Response } from "express";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { User } from "../../../../Entities/User";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import { QUEUES } from "../../../../constants/types/queue";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const updateProfile = async (
  req: Request,
  res: Response,
  iUserUseCase: UserUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
) => {
  const body = req.body as User;
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);
    let user = (await iUserUseCase.getUser(data.user)) as User;

    if (!user) {
      throw Error("User didn't found");
    }

    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.username = body.username;
    user.dateOfBirth = body.dateOfBirth;
    user.phoneNumber = body.phoneNumber;
    user.profileImageURL = body.profileImageURL;

    const updatedUser = await iUserUseCase.updateUser(user);

    iRabbitMQUseCase.sendDataToQueue(QUEUES.PROJECT_USER_CREATION, updatedUser);
    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.EMPLOYEE_USER_CREATION,
      updatedUser
    );
    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.CHAT_MEETING_USER_CREATION,
      updatedUser
    );

    return res.status(200).json({
      user: updatedUser,
      success: true,
      message: "Profile Successfully updated",
    });
  } catch (error: any) {
    console.log("file: updateProfile.controller.ts:41 -> error", error);
    res.status(400).json({ success: false, error: error.message });
  }
};
