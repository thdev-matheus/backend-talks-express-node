import { Request, Response } from "express";
import { deleteLikeService } from "../../services/likes/deleteLike.service";

export const deleteLikeController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { postId } = req.params;

  await deleteLikeService(userId, postId);

  return res.status(200).json({ message: "Like deleted successfuly" });
};
