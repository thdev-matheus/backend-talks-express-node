import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { User } from "../../entities/user.entity";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";
import { ICommentRequest } from "../../interfaces/comments";
import { Notification } from "../../entities/notification.entity";

export const createCommentService = async ({
  postId,
  userId,
  text,
}: ICommentRequest) => {
  if (!postId) {
    throw new AppError(400, "the postId was missing", "https://http.cat/400");
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "User not found", "https://http.cat/404");
  }

  const postRepository = AppDataSource.getRepository(Post);
  const post = await postRepository.findOneBy({ id: postId });

  if (!post) {
    throw new AppError(404, "Post not found", "https://http.cat/404");
  }

  if (!text) {
    throw new AppError(400, "Send a comment", "https://http.cat/400");
  }

  const commentRepository = AppDataSource.getRepository(Comment);

  const newComment = commentRepository.create({
    post,
    user,
    text,
  });

  await commentRepository.save(newComment);

  const notificationRepository = AppDataSource.getRepository(Notification);
  const newNotification = notificationRepository.create({
    launcherUser: user,
    ownerUser: post.user,
    post,
    type: "comment",
  });

  await notificationRepository.save(newNotification);

  const comment = await commentRepository.findOne({
    where: { id: newComment.id },
    relations: { user: true },
  });

  return comment;
};
