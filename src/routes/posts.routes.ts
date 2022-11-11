import { Router } from "express";
import { createPostController } from "../controllers/posts/createPost.controller";
import { deletePostController } from "../controllers/posts/deletePost.controller";
import { readAllPostsController } from "../controllers/posts/readAllPosts.controller";
import { readAllUserPostController } from "../controllers/posts/readAllUserPosts.controller";
import { readOnePostController } from "../controllers/posts/readOnePost.controller";
import { updatePostController } from "../controllers/posts/updatePost.controller";
import { authUserMiddleware } from "../middlewares/user/authUser.middleware";

const router = Router();

export const postRoutes = () => {
  router.post("", authUserMiddleware, createPostController);
  router.get("", authUserMiddleware, readAllPostsController);
  router.get("/:postId", authUserMiddleware, readOnePostController);
  router.get("/user/:userId", authUserMiddleware, readAllUserPostController);
  router.patch("/:postId", authUserMiddleware, updatePostController);
  router.delete("/:postId", authUserMiddleware, deletePostController);

  return router;
};
