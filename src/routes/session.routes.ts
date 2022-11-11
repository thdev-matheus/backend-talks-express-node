import { Router } from "express";
import { loginController } from "../controllers/session/login.controller";

const router = Router();

export const sessionRoutes = () => {
  router.post("", loginController);

  return router;
};
