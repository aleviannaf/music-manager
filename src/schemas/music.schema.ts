import { z } from "zod"

const music = z.object({
    id: z.number().positive(),
    name: z.string().max(100),
    author: z.string().max(100),
    album: z.string().max(255).nullish()
})

const musicCreate = music.omit({id:true}).array()

const musicPagination = z.object({
    prevPage: z.string().nullable(),
    nextPage: z.string().nullable(),
    currentPage: z.number().positive(),
    totalItens: z.number(),
    data: music.array()
})

export { music, musicCreate, musicPagination }