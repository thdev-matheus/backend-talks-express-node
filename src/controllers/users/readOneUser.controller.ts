import { Request, Response } from "express";
import { readOneUserService } from "../../services/users/readOneUser.service";
import { instanceToPlain } from "class-transformer";

export const readOneUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await readOneUserService(userId);

  return res.status(200).json(instanceToPlain(user));
};
