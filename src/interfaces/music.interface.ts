import { z } from "zod"
import { music, musicCreate, musicPagination } from "../schemas"
import { QueryResult } from "pg"

type Music = z.infer<typeof music>
type MusicCreate = z.infer<typeof musicCreate>
type MusicPagination = z.infer<typeof musicPagination>

type MusicResult = QueryResult<Music>

export  { Music, MusicCreate, MusicResult, MusicPagination }