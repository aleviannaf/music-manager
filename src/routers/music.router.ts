import { Router } from "express"
import middlewares from "../middlewares"
import { musicControllers } from "../controllers"
import { musicCreate } from "../schemas"

const musicRouter: Router = Router()

musicRouter.post(
    "",
    middlewares.verifyToken,
    middlewares.validatedAdmin,
    middlewares.validateBody(musicCreate),
    musicControllers.create
)

musicRouter.get(
    "",
    musicControllers.read
)

export default musicRouter