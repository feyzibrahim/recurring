import { Request, Response } from "express";
import { AuthUseCaseInterface } from "../../../../interface/auth/AuthUseCaseInterface";
import { User } from "../../../../Entities/User";
import validateUser from "../../../../util/validation/signup.validate";
import hashPassword from "../../../../util/hash/password.hash";
import { sendVerificationLink } from "../../../../util/nodemailer/sendVerificationLink";
import { OrganizationUseCaseInterface } from "../../../../interface/organization/OrganizationUseCaseInterface";
import { Organization } from "../../../../Entities/Organization";
import { QUEUES } from "../../../../constants/types/queue";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";

export const signup = async (
  req: Request,
  res: Response,
  iAuthUseCase: AuthUseCaseInterface,
  iOrgUseCase: OrganizationUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
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
    iRabbitMQUseCase.sendDataToQueue(QUEUES.EMPLOYEECREATION, newUser);
    iRabbitMQUseCase.sendDataToQueue(QUEUES.PROJECT_USER_CREATION, newUser);
    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.CHAT_MEETING_USER_CREATION,
      newUser
    );

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

    return res.status(200).json({
      user: newUser,
      success: true,
      message: "Users successfully Registered",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
