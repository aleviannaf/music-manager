import handleErrors from "./handleErrors";
import validateIdExists from "./validateIdExists.middleware";
import validateUsernameExists from "./validateUsernameExists.middleware";
import validateBody from "./validateBody.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyUserPermisson from "./verifyUserPermission.middleware";
import validatedAdmin from "./validatedAdmin.middleware";

export default {
  handleErrors,
  validateIdExists,
  validateUsernameExists,
  validateBody,
  verifyToken,
  verifyUserPermisson,
  validatedAdmin
};