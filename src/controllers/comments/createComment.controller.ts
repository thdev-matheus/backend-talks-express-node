import { Request, Response } from "express";
import { createCommentService } from "../../services/comments/createComment.service";
import { instanceToPlain } from "class-transformer";

export const createCommentController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { postId } = req.params;
  const { text } = req.body;

  const newComment = await createCommentService({ userId, postId, text });

  return res.status(201).json(instanceToPlain(newComment));
};
