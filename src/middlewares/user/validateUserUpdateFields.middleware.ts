import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../../interfaces/users";

export const validateUpdateUserFieldsMiddleware =
  (schema: SchemaOf<IUserUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IUserUpdate = req.body;

      await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (err: any) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: err.errors?.join(", "),
        image: "https://http.cat/400",
      });
    }
  };
