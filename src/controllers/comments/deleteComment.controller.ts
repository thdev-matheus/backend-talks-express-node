import { Request, Response } from "express";
import { deleteCommentService } from "../../services/comments/deleteComment.service";

export const deleteCommentController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { commentId } = req.params;

  await deleteCommentService(userId, commentId);

  return res.status(200).json({ message: "Comment deleted successfuly" });
};
