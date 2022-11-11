import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Comment } from "../../entities/comment.entity";

export const deleteCommentService = async (
  userId: string,
  commentId: string
) => {
  if (!commentId) {
    throw new AppError(
      400,
      "the commentId was missing",
      "https://http.cat/400"
    );
  }

  const commentRepository = AppDataSource.getRepository(Comment);
  const comment = await commentRepository.findOne({
    where: { id: commentId },
    relations: { user: true, post: true },
  });

  if (!comment) {
    throw new AppError(404, "Comment not found", "https://http.cat/404");
  }

  if (comment.user.id !== userId) {
    throw new AppError(
      401,
      "This comment can only be deleted by its respective owner",
      "https://http.cat/401"
    );
  }

  await commentRepository.delete(commentId);

  return true;
};
