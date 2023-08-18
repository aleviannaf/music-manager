import { z } from "zod"
import { playlist, playlistAddMusic, playlistCreate } from "../schemas"
import { QueryResult } from "pg"

type Playlist = z.infer<typeof playlist>
type PlaylistCreate = z.infer<typeof playlistCreate>
type PlaylistAddMusic = z.infer<typeof playlistAddMusic>

type PlaylistResult = QueryResult<Playlist>

export { PlaylistCreate, Playlist, PlaylistResult, PlaylistAddMusic }