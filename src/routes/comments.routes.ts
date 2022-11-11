import { Router } from "express";
import { createCommentController } from "../controllers/comments/createComment.controller";
import { deleteCommentController } from "../controllers/comments/deleteComment.controller";
import { readAllPostCommentsController } from "../controllers/comments/readAllPostComments.controller";
import { updateCommentController } from "../controllers/comments/updateComment.controller";

import { authUserMiddleware } from "../middlewares/user/authUser.middleware";

const router = Router();

export const commentsRoutes = () => {
  router.post("/:postId", authUserMiddleware, createCommentController);
  router.get("/:postId", authUserMiddleware, readAllPostCommentsController);
  router.patch("/:commentId", authUserMiddleware, updateCommentController);
  router.delete("/:commentId", authUserMiddleware, deleteCommentController);

  return router;
};
