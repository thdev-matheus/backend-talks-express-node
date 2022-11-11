import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

export const readAllUsersService = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const userList = await userRepository.find();

  return userList;
};
