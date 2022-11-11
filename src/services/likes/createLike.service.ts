import AppDataSource from "../../data-source";
import { Like } from "../../entities/like.entity";
import { User } from "../../entities/user.entity";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";
import { Notification } from "../../entities/notification.entity";

export const createLikeService = async (userId: string, postId: string) => {
  if (!postId) {
    throw new AppError(400, "Missing the postId", "https://http.cat/400");
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

  const likeRepository = AppDataSource.getRepository(Like);
  const likes = await likeRepository.find({
    relations: { post: true, user: true },
  });

  const likeAlreadyExist = likes.some((like) => {
    return like.user.id === userId && like.post.id === postId;
  });

  if (likeAlreadyExist) {
    throw new AppError(
      400,
      "This post has already been liked by this user",
      "https://http.cat/400"
    );
  }

  const newLike = likeRepository.create({
    post,
    user,
  });

  await likeRepository.save(newLike);

  const notificationRepository = AppDataSource.getRepository(Notification);
  const newNotification = notificationRepository.create({
    launcherUser: user,
    ownerUser: post.user,
    post,
    type: "Like",
  });

  await notificationRepository.save(newNotification);

  return newLike;
};
