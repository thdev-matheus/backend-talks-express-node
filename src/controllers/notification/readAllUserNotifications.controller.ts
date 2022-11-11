import { Request, Response } from "express";
import { readAllUserNotificationsService } from "../../services/notifications/readAllUserNotifications.service";
import { instanceToPlain } from "class-transformer";

export const readAllUserNotificationController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req;

  const userNotifications = await readAllUserNotificationsService(userId);

  return res.status(200).json(instanceToPlain(userNotifications));
};
