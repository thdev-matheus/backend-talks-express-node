import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async ({ email, password }: IUserLogin) => {
  if (!email || !password) {
    throw new AppError(
      400,
      "The following fields are mandatory: email, password",
      "https://http.cat/400"
    );
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (!user) {
    throw new AppError(
      401,
      "Invalid email or password",
      "https://http.cat/401"
    );
  }

  if (!user.isActive) {
    await userRepository.update(user.id, { isActive: true });
  }

  const passwordMatch = compareSync(password, user.password);

  if (!passwordMatch) {
    throw new AppError(
      401,
      "Invalid email or password",
      "https://http.cat/401"
    );
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" }
  );

  const loggedUser = await userRepository.findOneBy({ email });

  return {
    token,
    user: loggedUser!,
  };
};
