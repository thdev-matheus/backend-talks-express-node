import { Request, Response } from "express";
import { readAllPostCommentsService } from "../../services/comments/readAllPostComments.service";
import { instanceToPlain } from "class-transformer";

export const readAllPostCommentsController = async (
  req: Request,
  res: Response
) => {
  const { postId } = req.params;

  const postComments = await readAllPostCommentsService(postId);

  return res.status(200).json(instanceToPlain(postComments));
};
