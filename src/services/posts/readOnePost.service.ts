import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";

export const readOnePostService = async (postId: string) => {
  if (!postId) {
    throw new AppError(400, "The postId was missing", "https://http.cat/400");
  }

  const postRepository = AppDataSource.getRepository(Post);
  const post = await postRepository.findOneBy({ id: postId });

  if (!post) {
    throw new AppError(404, "Post not found", "https://http.cat/404");
  }

  return post;
};
