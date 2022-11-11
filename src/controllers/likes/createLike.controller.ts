import { Request, Response } from "express";
import { createLikeService } from "../../services/likes/createLike.service";
import { instanceToPlain } from "class-transformer";

export const createLikeController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { postId } = req.params;

  const likedPost = await createLikeService(userId, postId);

  return res.status(200).json(instanceToPlain(likedPost));
};
