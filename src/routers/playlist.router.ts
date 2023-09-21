import { Router } from "express"
import middlewares from "../middlewares"
import { playlistAddMusic, playlistCreate } from "../schemas"
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

playlistRouter.post(
    "/:playlistID/add",
    middlewares.validateBody(playlistAddMusic),
    middlewares.validateIdExists("params", "playlistId", "playlists", "Playlist not found."),
    middlewares.validateIdExists("body", "musicId", "musics", "Music not found."),
    middlewares.verifyToken,
    playlistControllers.addMusic
)

export default playlistRouter