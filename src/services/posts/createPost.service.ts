import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../errors/AppError";
import { IPostRequest } from "../../interfaces/posts";

export const createPostService = async (
  userId: string,
  { text, image }: IPostRequest
) => {
  if (!text && !image) {
    throw new AppError(
      400,
      "Send a text or image to post",
      "https://http.cat/400"
    );
  }

  const userRepository = AppDataSource.getRepository(User);
  const postRepository = AppDataSource.getRepository(Post);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "User not found", "https://http.cat/404");
  }

  const newPost = postRepository.create({
    user,
    text,
    image,
  });

  await postRepository.save(newPost);

  return newPost;
};
