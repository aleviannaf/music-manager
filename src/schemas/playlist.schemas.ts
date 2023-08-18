import { z } from "zod"

const playlist = z.object({
    id: z.number().positive(),
    name: z.string().max(100),
    privacy: z.string().max(20),
    description: z.string().nullable(),
    createdAt: z.date(),
    userID: z.number().positive(),
})

const playlistCreate = playlist.omit({
    id: true,
    createdAt: true,
    userID: true
})

const playlistAddMusic = z.object({
    musicID: z.number().positive()
})

export { playlist, playlistCreate, playlistAddMusic  }