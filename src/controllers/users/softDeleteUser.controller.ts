import { Request, Response } from "express";
import { softDeleteUserService } from "../../services/users/softDeleteUser.service";

export const softDeleteUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await softDeleteUserService(userId);

  return res.status(200).json({ message: "User disabled successfully" });
};
