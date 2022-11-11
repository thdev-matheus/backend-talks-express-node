import AppDataSource from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { Like } from "../../entities/like.entity";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";

export const deletePostService = async (userId: string, postId: string) => {
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
      "A post can only be deleted by its respective owner",
      "https://http.cat/401"
    );
  }

  const likeRepository = AppDataSource.getRepository(Like);
  const likes = await likeRepository.find({ relations: { post: true } });
  const postLikes = likes.filter((like) => like.post.id === postId);

  postLikes.forEach(async (like) => await likeRepository.delete(like.id));

  const commentRepository = AppDataSource.getRepository(Comment);
  const comments = await commentRepository.find({ relations: { post: true } });
  const postComments = comments.filter((comment) => comment.post.id === postId);

  postComments.forEach(
    async (comment) => await commentRepository.delete(comment.id)
  );

  await postRepository.delete(postId);

  return true;
};
