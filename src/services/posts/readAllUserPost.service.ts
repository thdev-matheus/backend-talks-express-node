import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";

export const readAllUserPostService = async (userId: string) => {
  if (!userId) {
    throw new AppError(400, "the userId was missing", "https://http.cat/400");
  }

  const postRepository = AppDataSource.getRepository(Post);
  const posts = await postRepository.find();
  const userPosts = posts.filter((post) => post.user.id === userId);

  return userPosts;
};
