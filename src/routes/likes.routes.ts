import { Router } from "express";
import { createLikeController } from "../controllers/likes/createLike.controller";
import { deleteLikeController } from "../controllers/likes/deleteLike.controller";
import { readAllPostLikescontroller } from "../controllers/likes/readAllPostLikes.controller";
import { authUserMiddleware } from "../middlewares/user/authUser.middleware";

const router = Router();

export const likeRoutes = () => {
  router.post("/:postId", authUserMiddleware, createLikeController);
  router.get("/:postId", authUserMiddleware, readAllPostLikescontroller);
  router.delete("/:postId", authUserMiddleware, deleteLikeController);

  return router;
};
