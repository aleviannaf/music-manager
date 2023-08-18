import { z } from "zod"

const music = z.object({
    id: z.number().positive(),
    name: z.string().max(100),
    author: z.string().max(100),
    album: z.string().max(255).nullish()
})

const musicCreate = music.omit({id:true}).array()

export { music, musicCreate }