import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { readAllUsersController } from "../controllers/users/readAllUsers.controller";
import { readOneUserController } from "../controllers/users/readOneUser.controller";
import { softDeleteUserController } from "../controllers/users/softDeleteUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { validateUserEmailController } from "../controllers/users/verifyUserEmail.controller";
import { authUserMiddleware } from "../middlewares/user/authUser.middleware";
import { validateCreateUserFieldsMiddleware } from "../middlewares/user/validateUserCreateFields.middleware";
import { validateUpdateUserFieldsMiddleware } from "../middlewares/user/validateUserUpdateFields.middleware";
import { userCreateSchema } from "../schemas/user/userCreate.schema";
import { userUpdateSchema } from "../schemas/user/userUpdate.schema";

const router = Router();

export const userRoutes = () => {
  router.post(
    "",
    validateCreateUserFieldsMiddleware(userCreateSchema),
    createUserController
  );
  router.get("", authUserMiddleware, readAllUsersController);
  router.get("/:userId", authUserMiddleware, readOneUserController);
  router.patch("/email/validate", validateUserEmailController);
  router.patch(
    "/:userId",
    authUserMiddleware,
    validateUpdateUserFieldsMiddleware(userUpdateSchema),
    updateUserController
  );
  router.delete("/:userId", authUserMiddleware, softDeleteUserController);

  return router;
};
