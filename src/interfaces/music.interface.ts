import { z } from "zod"
import { music, musicCreate } from "../schemas"
import { QueryResult } from "pg"

type Music = z.infer<typeof music>
type MusicCreate = z.infer<typeof musicCreate>

type MusicResult = QueryResult<Music>

export  { Music, MusicCreate, MusicResult  }