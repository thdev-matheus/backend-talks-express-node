import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import { Notification } from "../../entities/notification.entity";

export const readAllUserNotificationsService = async (userId: string) => {
  if (!userId) {
    throw new AppError(400, "the userId was missing", "https://http.cat/400");
  }

  const notificationRepository = AppDataSource.getRepository(Notification);
  const notificationsList = await notificationRepository.find();

  const userNotifications = notificationsList.filter(
    (notification) => notification.ownerUser.id === userId
  );

  return userNotifications;
};
