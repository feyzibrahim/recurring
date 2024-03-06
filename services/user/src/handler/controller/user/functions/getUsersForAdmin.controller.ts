import { Request, Response } from "express";
import { UserUseCaseInterface } from "../../../../interface/user/UserUseCaseInterface";

export const getUsersForAdmin = async (
  req: Request,
  res: Response,
  iUserUseCase: UserUseCaseInterface
) => {
  try {
    const { role } = req.query;
    let users = await iUserUseCase.getUsersForAdmin(role as string);

    return res.status(200).json({
      users: users,
      success: true,
      message: "Users List Successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
