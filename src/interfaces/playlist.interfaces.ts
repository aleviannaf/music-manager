import { z } from "zod"
import { playlist, playlistCreate } from "../schemas"
import { QueryResult } from "pg"

type Playlist = z.infer<typeof playlist>
type PlaylistCreate = z.infer<typeof playlistCreate>

type PlaylistResult = QueryResult<Playlist>

export { PlaylistCreate, Playlist, PlaylistResult }