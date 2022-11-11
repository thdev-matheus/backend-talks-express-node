import { Request, Response } from "express";
import { deletePostService } from "../../services/posts/deletePost.service";

export const deletePostController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { postId } = req.params;

  await deletePostService(userId, postId);

  return res.status(200).json({ message: "Post deleted successfully" });
};
