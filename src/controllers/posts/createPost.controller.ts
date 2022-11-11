import { Request, Response } from "express";
import { IPostRequest } from "../../interfaces/posts";
import { createPostService } from "../../services/posts/createPost.service";
import { instanceToPlain } from "class-transformer";

export const createPostController = async (req: Request, res: Response) => {
  const { userId } = req;
  const { text, image }: IPostRequest = req.body;

  const newPost = await createPostService(userId, { text, image });

  return res.status(201).json(instanceToPlain(newPost));
};
