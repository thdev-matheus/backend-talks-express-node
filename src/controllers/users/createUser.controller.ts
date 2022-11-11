import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users";
import { createUserService } from "../../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";

export const createUserController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, birthdate, bio }: IUserRequest =
    req.body;

  const newUser = await createUserService({
    firstName,
    lastName,
    email,
    password,
    birthdate,
    bio,
  });

  return res.status(201).json(instanceToPlain(newUser));
};
