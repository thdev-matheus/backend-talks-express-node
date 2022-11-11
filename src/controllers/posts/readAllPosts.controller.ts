import { Request, Response } from "express";
import { readAllPostsService } from "../../services/posts/readAllPosts.service";
import { instanceToPlain } from "class-transformer";

export const readAllPostsController = async (req: Request, res: Response) => {
  const posts = await readAllPostsService();

  return res.status(200).json(instanceToPlain(posts));
};
