import { Request, Response } from "express";
import { IUserTokenRequest } from "../../interfaces/users";
import { validateUserEmailService } from "../../services/users/validateUserEmail.service";

export const validateUserEmailController = async (
  req: Request,
  res: Response
) => {
  const { token }: IUserTokenRequest = req.body;

  await validateUserEmailService({ token });

  return res.status(202).json({
    message: "Email successfully validated",
  });
};
