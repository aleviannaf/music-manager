import "express-async-errors";
import express, { Application, json } from "express";
import middlewares from "./middlewares";
import { musicRouter, playlistRouter, sessionRouter, userRouter } from "./routers";


const app: Application = express()
app.use(json());

app.use("/users", userRouter)
app.use("/login", sessionRouter)
app.use("/playlists", playlistRouter)
app.use("/musics", musicRouter)

app.use(middlewares.handleErrors)

export default app;