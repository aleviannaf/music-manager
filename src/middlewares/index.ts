import handleErrors from "./handleErrors";
import validateIdExists from "./validateIdExists.middleware";
import validateUsernameExists from "./validateUsernameExists.middleware";
import validateBody from "./validateBody.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyUserPermisson from "./verifyUserPermission.middleware";

export default {
  handleErrors,
  validateIdExists,
  validateUsernameExists,
  validateBody,
  verifyToken,
  verifyUserPermisson
};