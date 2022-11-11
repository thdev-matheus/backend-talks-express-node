import { Express } from "express";

import { userRoutes } from "./users.routes";
import { sessionRoutes } from "./session.routes";
import { postRoutes } from "./posts.routes";
import { likeRoutes } from "./likes.routes";
import { commentsRoutes } from "./comments.routes";
import { notificationRoutes } from "./notifications.routes";

export const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/login", sessionRoutes());
  app.use("/posts", postRoutes());
  app.use("/likes", likeRoutes());
  app.use("/comments", commentsRoutes());
  app.use("/notifications", notificationRoutes());
};
