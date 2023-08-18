import { Router } from "express"
import middlewares from "../middlewares"
import { playlistCreate } from "../schemas"
import { playlistControllers } from "../controllers"

const playlistRouter: Router = Router()

playlistRouter.post(
    "", 
    middlewares.validateBody(playlistCreate),
    middlewares.verifyToken, 
    playlistControllers.create
)

playlistRouter.get(
    "",
    middlewares.verifyToken,
    playlistControllers.read
)

export default playlistRouter