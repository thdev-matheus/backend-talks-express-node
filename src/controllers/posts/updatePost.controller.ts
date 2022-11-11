import { Request, Response } from "express";
import { updatePostService } from "../../services/posts/updatePost.service";
import { instanceToPlain } from "class-transformer";
import { IPostRequest } from "../../interfaces/posts";

export const updatePostController = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { userId } = req;
  const { text, image }: IPostRequest = req.body;

  const updatedPost = await updatePostService(userId, postId, { text, image });

  return res.status(200).json(instanceToPlain(updatedPost));
};
