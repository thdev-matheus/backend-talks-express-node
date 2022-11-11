import AppDataSource from "../../data-source";
import { Like } from "../../entities/like.entity";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";

export const readAllPostLikesService = async (postId: string) => {
  if (!postId) {
    throw new AppError(400, "the postId was missing", "https://http.cat/400");
  }

  const postRepository = AppDataSource.getRepository(Post);
  const post = postRepository.findOneBy({ id: postId });

  if (!post) {
    throw new AppError(404, "Post not found", "https://http.cat/404");
  }

  const likeRepository = AppDataSource.getRepository(Like);
  const likes = await likeRepository.find({
    relations: { post: true, user: true },
  });

  const postLikes = likes.filter((like) => like.post.id === postId);

  return postLikes;
};
