import { Request, Response } from "express";
import { readAllUsersService } from "../../services/users/readAllUSers.service";
import { instanceToPlain } from "class-transformer";

export const readAllUsersController = async (req: Request, res: Response) => {
  const users = await readAllUsersService();

  return res.status(200).json(instanceToPlain(users));
};
