import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

export const readAllPostsService = async () => {
  const postRepository = AppDataSource.getRepository(Post);
  const posts = await postRepository.find();

  return posts;
};
