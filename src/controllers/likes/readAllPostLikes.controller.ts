import { Request, Response } from "express";
import { readAllPostLikesService } from "../../services/likes/readAllPostLikes.service";
import { instanceToPlain } from "class-transformer";

export const readAllPostLikescontroller = async (
  req: Request,
  res: Response
) => {
  const { postId } = req.params;

  const postLikes = await readAllPostLikesService(postId);

  return res.status(200).json(instanceToPlain(postLikes));
};
