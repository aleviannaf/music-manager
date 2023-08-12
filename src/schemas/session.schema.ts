import {z} from "zod"

const sessionCreate = z.object({
    username: z.string().max(60),
    password: z.string().max(120),
})

export { sessionCreate };