import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import { loginService } from "../../services/session/login.service";
import { instanceToPlain } from "class-transformer";

export const loginController = async (req: Request, res: Response) => {
  const { email, password }: IUserLogin = req.body;

  const loggedUser = await loginService({ email, password });

  return res.status(200).json(instanceToPlain(loggedUser));
};
