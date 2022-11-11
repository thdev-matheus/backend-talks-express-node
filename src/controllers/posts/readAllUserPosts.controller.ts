import { Request, Response } from "express";
import { readAllUserPostService } from "../../services/posts/readAllUserPost.service";
import { instanceToPlain } from "class-transformer";

export const readAllUserPostController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;

  const userPosts = await readAllUserPostService(userId);

  return res.status(200).json(instanceToPlain(userPosts));
};
