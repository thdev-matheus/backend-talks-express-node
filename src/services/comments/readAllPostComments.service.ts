import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { AppError } from "../../errors/AppError";

export const readAllPostCommentsService = async (postId: string) => {
  if (!postId) {
    throw new AppError(400, "the postId was missing", "https://http.cat/400");
  }

  const commentRepository = AppDataSource.getRepository(Comment);
  const comments = await commentRepository.find({
    relations: { user: true, post: true },
  });
  const postComments = comments.filter((comment) => comment.post.id === postId);

  return postComments;
};
