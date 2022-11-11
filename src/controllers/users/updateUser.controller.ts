import { Request, Response } from "express";
import { updateUserService } from "../../services/users/updateUser.service";
import { IUserUpdate } from "../../interfaces/users";
import { instanceToPlain } from "class-transformer";

export const updateUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const {
    oldPassword,
    bio,
    birthdate,
    firstName,
    lastName,
    password,
    profileImage,
  }: IUserUpdate = req.body;

  const updatedUser = await updateUserService(userId, {
    oldPassword,
    bio,
    birthdate,
    firstName,
    lastName,
    password,
    profileImage,
  });

  return res.status(200).json(instanceToPlain(updatedUser));
};
