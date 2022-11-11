import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";
import { IPostRequest } from "../../interfaces/posts";

export const updatePostService = async (
  userId: string,
  postId: string,
  { text, image }: IPostRequest
) => {
  if (!postId) {
    throw new AppError(400, "the postId was missing", "https://http.cat/400");
  }

  const postRepository = AppDataSource.getRepository(Post);
  const post = await postRepository.findOneBy({ id: postId });

  if (!post) {
    throw new AppError(404, "Post not found", "https://http.cat/404");
  }

  if (post.user.id !== userId) {
    throw new AppError(
      401,
      "A post can only be changed by its respective owner",
      "https://http.cat/401"
    );
  }

  if (!text && !image) {
    throw new AppError(
      400,
      "Send a text or image to update post",
      "https://http.cat/400"
    );
  }

  await postRepository.update(postId, {
    text,
    image,
  });

  const updatedPost = await postRepository.findOneBy({ id: postId });

  return updatedPost!;
};
