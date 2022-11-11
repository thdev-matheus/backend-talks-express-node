import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";

export const readOneUserService = async (userId: string) => {
  if (!userId) {
    throw new AppError(400, "searchId was missing", "https://http.cat/400");
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "User not found", "https://http.cat/404");
  }

  if (!user.isActive) {
    throw new AppError(
      401,
      "Account deleted, please contact customer service",
      "https://http.cat/401"
    );
  }

  return user;
};
