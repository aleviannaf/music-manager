import { Router } from "express";
import middlewares from "../middlewares";
import { userControllers } from "../controllers";
import { userCreate, userUpdate } from "../schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreate),
  middlewares.validateUsernameExists,
  userControllers.create
);
userRouter.get(
  "",
  middlewares.verifyToken,
  middlewares.verifyUserPermisson,
  userControllers.read
);

userRouter.use(
  "/:userId",
  middlewares.validateIdExists("params", "userId", "users", "User not found."),
  middlewares.verifyToken,
  middlewares.verifyUserPermisson
);

userRouter.get("/:userId", userControllers.retrieve);
userRouter.patch(
  "/:userId",
  middlewares.validateBody(userUpdate),
  middlewares.validateUsernameExists,
  userControllers.partialUpdate
);

userRouter.delete("/:userId", userControllers.destroy);

export default userRouter;