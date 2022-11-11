import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Comment } from "../../entities/comment.entity";
import { ICommentUpdate } from "../../interfaces/comments";

export const updateCommentService = async ({
  userId,
  commentId,
  text,
}: ICommentUpdate) => {
  if (!commentId) {
    throw new AppError(
      400,
      "the commentId was missing",
      "https://http.cat/400"
    );
  }

  if (!text) {
    throw new AppError(
      400,
      "the text field is required",
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
      "This comment can only be changed by its respective owner",
      "https://http.cat/401"
    );
  }

  await commentRepository.update(commentId, {
    text,
  });

  const updatedComment = await commentRepository.findOne({
    where: { id: commentId },
    relations: { user: true, post: true },
  });

  return updatedComment!;
};
