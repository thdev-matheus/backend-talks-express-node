import { Router } from "express";

import { readAllUserNotificationController } from "../controllers/notification/readAllUserNotifications.controller";

import { authUserMiddleware } from "../middlewares/user/authUser.middleware";

const router = Router();

export const notificationRoutes = () => {
  router.get("", authUserMiddleware, readAllUserNotificationController);

  return router;
};
