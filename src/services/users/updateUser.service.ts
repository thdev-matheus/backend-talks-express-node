import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import { IUserUpdate } from "../../interfaces/users";
import { compareSync, hashSync } from "bcrypt";

export const updateUserService = async (
  userId: string,
  {
    oldPassword,
    bio,
    birthdate,
    firstName,
    lastName,
    password,
    profileImage,
  }: IUserUpdate
) => {
  if (!oldPassword) {
    throw new AppError(
      400,
      "the oldPassword field is required",
      "https://http.cat/400"
    );
  }

  if (
    !bio &&
    !birthdate &&
    !firstName &&
    !lastName &&
    !password &&
    !profileImage
  ) {
    throw new AppError(
      406,
      "It is not possible to make any changes if there is nothing to change",
      "https://http.cat/406"
    );
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "USer not found", "https://http.cat/404");
  }

  if (!user.isActive) {
    throw new AppError(401, "Inactive account", "https://http.cat/401");
  }

  const passwordMatch = compareSync(oldPassword, user.password);

  if (!passwordMatch) {
    throw new AppError(401, "Incorrect password", "https://http.cat/401");
  }

  await userRepository.update(userId, {
    bio: bio || user.bio,
    birthdate: birthdate || user.birthdate,
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    password: password ? hashSync(password, 10) : user.password,
    profileImage: profileImage || user.profileImage,
  });

  const updatedUser = await userRepository.findOneBy({ id: userId });

  return updatedUser!;
};
