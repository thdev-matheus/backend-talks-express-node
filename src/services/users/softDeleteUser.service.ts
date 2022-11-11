import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

export const softDeleteUserService = async (userId: string) => {
  if (!userId) {
    throw new AppError(400, "missing userId", "https://http.cat/400");
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "User not found", "https://http.cat/404");
  }

  if (!user.isActive) {
    throw new AppError(
      400,
      "User already desactivated",
      "https://http.cat/400"
    );
  }

  await userRepository.update(userId, {
    isActive: false,
  });

  return true;
};
