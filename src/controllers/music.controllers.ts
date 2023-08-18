import { Response, Request } from "express"
import { Music } from "../interfaces"
import { musicServices } from "../services"

const create = async (req: Request, res: Response): Promise<Response> =>{
    const musics: Music[] = await musicServices.create(res.locals.validated)

    return res.status(201).json(musics)
}

const read = async (req: Request, res: Response): Promise<Response> =>{
    const musics: Music[] = await musicServices.read()

    return res.status(200).json(musics)
}

export default { create, read }