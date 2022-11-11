import { Request, Response } from "express";
import { updateCommentService } from "../../services/comments/updateComment.service";
import { instanceToPlain } from "class-transformer";

export const updateCommentController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { commentId } = req.params;
  const { text } = req.body;

  const updatedComment = await updateCommentService({
    userId,
    commentId,
    text,
  });

  return res.status(200).json(instanceToPlain(updatedComment));
};
