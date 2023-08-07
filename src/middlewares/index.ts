import handleErrors from "./handleErrors";
import validateIdExists from "./validateIdExists.middleware";
import validateUsernameExists from "./validateUsernameExists.middleware";
import validateBody from "./validateBody.middleware";

export default {
  handleErrors,
  validateIdExists,
  validateUsernameExists,
  validateBody,
};