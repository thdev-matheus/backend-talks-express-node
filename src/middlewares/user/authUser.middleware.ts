import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";

export const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(
      401,
      "Missing authorization token",
      "https://http.cat/401"
    );
  }

  let tokenArray = authorization.split(" ");
  let token: string;

  if (tokenArray.length > 1) {
    if (tokenArray[0].toLowerCase() !== "bearer") {
      throw new AppError(
        400,
        "The authentication token must be of type Bearer.",
        "https://http.cat/400"
      );
    }
    token = tokenArray[1];
  } else {
    token = tokenArray[0];
  }

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(401, "Invalid token", "https://http.cat/401");
      }
      req.userEmail = decoded.email;
      req.userId = decoded.id;
      next();
    }
  );
};
