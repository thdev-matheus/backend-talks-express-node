import AppDataSource from "../../data-source";
import { Like } from "../../entities/like.entity";
import { AppError } from "../../errors/AppError";

export const deleteLikeService = async (userId: string, postId: string) => {
  if (!postId) {
    throw new AppError(400, "the postId was missing", "https://http.cat/400");
  }

  const likeRepository = AppDataSource.getRepository(Like);
  const likes = await likeRepository.find({
    relations: { user: true, post: true },
  });

  const like = likes.find((l) => l.post.id === postId && l.user.id === userId);

  if (!like) {
    throw new AppError(404, "Like not found", "https://http.cat/404");
  }

  await likeRepository.delete(like.id);

  return true;
};
