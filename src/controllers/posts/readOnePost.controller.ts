import { Request, Response } from "express";
import { readOnePostService } from "../../services/posts/readOnePost.service";
import { instanceToPlain } from "class-transformer";

export const readOnePostController = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const post = await readOnePostService(postId);

  return res.status(200).json(instanceToPlain(post));
};
