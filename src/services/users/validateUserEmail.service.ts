import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import { User } from "../../entities/user.entity";
import { IUserTokenRequest } from "../../interfaces/users";

export const validateUserEmailService = async ({
  token,
}: IUserTokenRequest) => {
  if (!token) {
    throw new AppError(401, "Token is missing", "https://http.cat/401");
  }

  const userRepository = AppDataSource.getRepository(User);

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        throw new AppError(401, "Invalid token", "https://http.cat/401");
      }

      const user = await userRepository.findOneBy({
        email: decoded.email,
        id: decoded.id,
      });

      if (!user) {
        throw new AppError(
          404,
          "Email not registered in database",
          "https://http.cat/404"
        );
      }

      await userRepository.update(decoded.id, { isVerified: true });
    }
  );

  return true;
};
